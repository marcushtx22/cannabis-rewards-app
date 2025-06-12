# Small Business Automation App

A comprehensive automation solution for small businesses, providing tools for task management, customer relationship management (CRM), inventory tracking, and basic accounting.

## Features

- **Task Management**: Create, track, and manage business tasks with priorities and due dates
- **Customer Management**: Store and manage customer information and purchase history
- **Inventory Management**: Track products, quantities, and categories
- **Transaction Tracking**: Record sales and generate reports
- **Data Persistence**: Save and load business data to/from JSON files

## Installation

1. Clone this repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

```python
from business_model import BusinessAutomation, Task, Customer, InventoryItem, Transaction
from datetime import datetime

# Initialize the automation system
business = BusinessAutomation()

# Add a new task
task = Task(
    title="Order supplies",
    description="Order new office supplies",
    due_date=datetime(2023, 12, 31),
    priority="high"
)
business.add_task(task)

# Add a new customer
customer = Customer(
    name="John Doe",
    email="john@example.com",
    phone="123-456-7890",
    address="123 Main St"
)
business.add_customer(customer)

# Save data
business.save_data("business_data.json")

# Load data
business.load_data("business_data.json")
```

## Project Structure

- `business_model.py`: Core business logic and data models
- `requirements.txt`: Project dependencies
- `README.md`: Project documentation

## License

MIT License 