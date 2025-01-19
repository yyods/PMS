#!/usr/bin/env python3

import csv
import sys

# Define the classification function
def classify_record(row):
    try:
        # Convert the necessary fields to float for comparison
        category_1 = float(row['หมวดที่ 1'])
        category_2 = float(row['หมวดที่ 2'])
        category_3 = float(row['หมวดที่ 3'])
        category_4 = float(row['หมวดที่ 4'])
        category_5 = float(row['หมวดที่ 5'])
        category_6 = float(row['หมวดที่ 6'])

        # Check conditions for "process"
        if (
            category_1 >= 9 and
            category_2 >= 3.5 and
            category_3 >= 2.5 and
            category_4 >= 2.5 and
            category_5 >= 3.5 and
            category_6 >= 0.5
        ):
            return "process"
        else:
            return "return"
    except ValueError:
        return "return"  # Handle non-numeric values gracefully

# Ensure correct usage
if len(sys.argv) != 3:
    print("Usage: ./checking.py <input_file> <output_file>")
    sys.exit(1)

# Read input and output file paths from command-line arguments
input_file = sys.argv[1]
output_file = sys.argv[2]

# Read the CSV, classify records, and write the results back
with open(input_file, mode='r', encoding='utf-8') as infile:
    with open(output_file, mode='w', encoding='utf-8', newline='') as outfile:
        reader = csv.DictReader(infile)
        # Normalize headers by stripping whitespace
        reader.fieldnames = [field.strip() for field in reader.fieldnames]
        print("Normalized Headers in CSV:", reader.fieldnames)  # Debug line to print normalized headers
        fieldnames = reader.fieldnames + ['status']  # Add the new column
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)

        writer.writeheader()
        for row in reader:
            # Strip whitespace from keys for consistent access
            row = {key.strip(): value for key, value in row.items()}
            row['status'] = classify_record(row)
            writer.writerow(row)

print(f"Classification completed. Results saved to {output_file}")
