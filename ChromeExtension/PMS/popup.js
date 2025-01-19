document.addEventListener("DOMContentLoaded", () => {
  // Update the output in the popup
  async function updateOutput() {
    const { collectedRows } = await chrome.storage.local.get("collectedRows");
    const outputDiv = document.getElementById("output");

    if (!collectedRows || collectedRows.length === 0) {
      outputDiv.innerHTML = "<p>No data collected yet.</p>";
      return;
    }

    // Create an HTML table for the collected data
    const tableHeader = `<tr><th>${collectedRows[0]
      .split(",")
      .join("</th><th>")}</th></tr>`;
    const tableRows = collectedRows
      .slice(1)
      .map((row) => `<tr><td>${row.split(",").join("</td><td>")}</td></tr>`)
      .join("");
    outputDiv.innerHTML = `<table border="1" style="width: 100%; border-collapse: collapse;">${tableHeader}${tableRows}</table>`;
  }

  // Start the collection process
  document
    .getElementById("start-collection")
    .addEventListener("click", async () => {
      await chrome.storage.local.set({ collectedRows: [] }); // Clear previous data
      // alert(
      //   "Data collection started! Navigate to the first page and click 'Collect Data'."
      // );
      updateOutput(); // Clear the output display
    });

  // Collect data from the current page
  document
    .getElementById("collect-data")
    .addEventListener("click", async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab.id) {
          alert("No active tab found!");
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: extractDataFromPage,
          },
          async (results) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              alert(
                "Error executing script: " + chrome.runtime.lastError.message
              );
              return;
            }

            if (results && results[0] && results[0].result) {
              const csvData = results[0].result.split("\n");
              const storedData =
                (await chrome.storage.local.get("collectedRows"))
                  .collectedRows || [];

              if (storedData.length === 0) {
                // Add the header if no data collected yet
                storedData.push(csvData[0]); // Header
              }

              storedData.push(csvData[1]); // Row data
              await chrome.storage.local.set({ collectedRows: storedData });

              // alert("Data collected for the current page!");
              updateOutput(); // Update the output display
            } else {
              alert("No data found on this page.");
            }
          }
        );
      } catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message);
      }
    });

  // Export all collected data as a single CSV
  document.getElementById("export-csv").addEventListener("click", async () => {
    const { collectedRows } = await chrome.storage.local.get("collectedRows");

    if (!collectedRows || collectedRows.length === 0) {
      alert("No data to export. Please collect data first.");
      return;
    }

    const finalCSV = collectedRows.join("\n");
    copyToClipboard(finalCSV); // Optionally copy to clipboard
    downloadCSV(finalCSV, "collected_data.csv"); // Trigger download
    // alert("CSV data exported!");
  });

  // Helper to download a CSV file
  function downloadCSV(data, filename) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Clipboard functions
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => console.log("Successfully copied to clipboard!"),
        (err) => console.error("Failed to copy to clipboard:", err)
      );
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        console.log("Fallback: Successfully copied to clipboard!");
      } catch (err) {
        console.error("Fallback: Failed to copy to clipboard:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  // Extract data from the page
  function extractDataFromPage() {
    const data = {};

    // Extract User Name
    const userBox = document.querySelector("cu-epms-workload-user-box");
    if (userBox) {
      const nameElement = userBox.querySelector(".font-mitr");
      data.name = nameElement ? nameElement.innerText.trim() : "Unknown";
    } else {
      data.name = "Not Found";
    }

    // Initialize workload categories
    const workloadCategories = {
      "หมวดที่ 1": 0,
      "หมวดที่ 2": 0,
      "หมวดที่ 3": 0,
      "หมวดที่ 4": 0,
      "หมวดที่ 5": 0,
      "หมวดที่ 6": 0,
    };

    // Extract Workload Data
    const workloadLinks = document.querySelectorAll(
      "a.p-accordion-header-link"
    );

    workloadLinks.forEach((link) => {
      const headerElement = link.querySelector(
        ".font-chula.font-700.text-20px"
      );
      const headerText = headerElement
        ? Array.from(headerElement.childNodes)
            .map((node) => node.textContent.trim())
            .join(" ")
            .trim()
        : "Unknown Header";

      const categoryMatch = Object.keys(workloadCategories).find((category) =>
        headerText.startsWith(category)
      );

      if (categoryMatch) {
        const workloadElement = Array.from(
          link.querySelectorAll("div.rounded-\\[4px\\]")
        ).find((div) => div.textContent.includes("ภาระงาน"));

        const workload = workloadElement
          ? parseFloat(workloadElement.textContent.trim().split(" ")[0])
          : 0;

        workloadCategories[categoryMatch] = workload;
      }
    });

    // Extract Total Workload
    const tabPanel = document.querySelector('div[role="tabpanel"]');
    if (tabPanel) {
      const totalWorkloadContainer = tabPanel.querySelector(
        "div.flex.justify-between"
      );
      if (totalWorkloadContainer) {
        const totalWorkloadElement =
          totalWorkloadContainer.querySelector("div.sum-duty");
        data.totalWorkload = totalWorkloadElement
          ? totalWorkloadElement.innerText.trim()
          : "Unknown Total Workload";
      } else {
        data.totalWorkload = "Container Not Found";
      }
    } else {
      data.totalWorkload = "Tab Panel Not Found";
    }

    // Format CSV
    const csvHeader = [
      "name",
      ...Object.keys(workloadCategories),
      "totalWorkload",
    ].join(", ");
    const csvRow = [
      data.name,
      ...Object.values(workloadCategories),
      data.totalWorkload,
    ].join(", ");

    return `${csvHeader}\n${csvRow}`;
  }

  // Load initial data into the output on page load
  updateOutput();
});
