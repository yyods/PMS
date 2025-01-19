# CSV Classification Tool

This Python script processes a CSV file containing workload data and classifies each record as either `process` or `return` based on specified conditions. The classification is saved to a new CSV file under a column named `status`.

## Features

- Reads input data from a CSV file.
- Normalizes column headers and handles extra spaces.
- Applies classification based on predefined thresholds.
- Outputs results to a specified CSV file.

## Requirements

- Python 3.6+
- UTF-8 encoded CSV files

## Folder Structure

```
.
├── Processing
│   ├── 2567.csv        # Example input file
│   ├── checking.py     # Main Python script
│   ├── out.csv         # Example output file
```

## Usage

1. Navigate to the `Processing` directory in your terminal.
2. Run the script as follows:

   ```bash
   ./checking.py <input_file> <output_file>
   ```

   Replace `<input_file>` with the path to your input CSV file and `<output_file>` with the desired path for the output CSV file.

### Example

```bash
./checking.py 2567.csv out.csv
```

## Input CSV Format

The input CSV should have the following column headers:

- `หมวดที่ 1`
- `หมวดที่ 2`
- `หมวดที่ 3`
- `หมวดที่ 4`
- `หมวดที่ 5`
- `หมวดที่ 6`
- `totalWorkload`

### Example Input

```
name,หมวดที่ 1,หมวดที่ 2,หมวดที่ 3,หมวดที่ 4,หมวดที่ 5,หมวดที่ 6,totalWorkload
"John Doe",10.5,4.2,3.1,2.8,3.9,0.6,25.1
"Jane Smith",8.0,3.0,2.0,2.5,3.5,0.4,19.4
```

## Output CSV Format

The output CSV will include all input columns and an additional `status` column containing either `process` or `return`.

### Example Output

```
name,หมวดที่ 1,หมวดที่ 2,หมวดที่ 3,หมวดที่ 4,หมวดที่ 5,หมวดที่ 6,totalWorkload,status
"John Doe",10.5,4.2,3.1,2.8,3.9,0.6,25.1,process
"Jane Smith",8.0,3.0,2.0,2.5,3.5,0.4,19.4,return
```

## Notes

- Ensure the input CSV file has UTF-8 encoding to prevent errors with special characters.
- If headers contain leading/trailing spaces, they will be automatically stripped.

## License

This project is licensed under the MIT License.

---

For more details, contact the project maintainer.
