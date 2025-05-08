import os

def load_dataset(file_path):
    """Load code snippets from a file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset file not found: {file_path}")
    with open(file_path, 'r') as f:
        return [line.strip() for line in f.readlines()]