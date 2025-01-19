# CU-ePMS Data Extractor

A Chrome extension to extract workload data from the CU-ePMS platform. This tool enables users to collect, view, and export workload data across multiple pages in CSV format for further analysis.

---

## Features

- **Data Collection**: Collect workload data from multiple pages in CU-ePMS.
- **Real-Time Display**: View collected data in the extension popup.
- **CSV Export**: Export the consolidated data to a CSV file.
- **Clipboard Support**: Copy the CSV data directly to the clipboard.

---

## Installation

1. Clone or download this repository to your local machine:

   ```bash
   git clone https://github.com/<your-github-username>/cu-epms-data-extractor.git
   cd cu-epms-data-extractor
   ```

2. Open the Chrome browser and go to `chrome://extensions/`.

3. Enable **Developer Mode** by toggling the switch in the top-right corner.

4. Click **Load unpacked** and select the folder containing this extension.

5. The extension will now appear in your Chrome toolbar.

---

## Usage

1. **Start Data Collection**:

   - Click on the extension icon in the Chrome toolbar.
   - Click the **Start Collection** button to initialize the data collection process.

2. **Collect Data**:

   - Navigate to a CU-ePMS page.
   - Click the **Collect Data** button to extract the data from the current page.
   - Repeat this step for multiple pages.

3. **Export CSV**:

   - After collecting data from all desired pages, click the **Export CSV** button to download the data in CSV format.

4. **View Collected Data**:
   - The collected data is displayed in the popup in real-time.

---

## Project Structure

- `manifest.json`: The extension's metadata and permissions.
- `popup.html`: The popup interface displayed to the user.
- `popup.js`: The core logic for data extraction, display, and storage.
- `style.css` (optional): Custom styles for the popup (if needed).
- `README.md`: This documentation.

---

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your descriptive commit message here"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Special thanks to the CU-ePMS platform for inspiring this tool.
