import unittest
from SRC.code_similarity import get_embedding

def test_get_embedding():
    code = "def add(a, b): return a + b"
    embedding = get_embedding(code)
    assert embedding is not None, "Embedding should not be None"