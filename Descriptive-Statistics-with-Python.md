# Descriptive Statistics with Python

## Table of Contents

1. [Basic Statistics](#basic-statistics)
2. [Data Analysis Functions](#data-analysis-functions)
3. [Visualization Options](#visualization-options)
4. [Advanced Statistics](#advanced-statistics)

## Basic Statistics

### Core Statistical Functions

```python
import numpy as np
from scipy import stats

def basic_stats(data):
    """
    Calculate basic statistical measures.
    
    Parameters:
    data (list or array-like): Numerical data
    
    Returns:
    dict: Dictionary of statistical measures
    """
    data = np.array(data)
    return {
        'count': len(data),
        'mean': float(np.mean(data)),
        'median': float(np.median(data)),
        'std': float(np.std(data)),
        'min': float(np.min(data)),
        'max': float(np.max(data)),
        'q1': float(np.percentile(data, 25)),
        'q3': float(np.percentile(data, 75))
    }

# Example usage
data = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9]
print(basic_stats(data))
```

### Frequency Analysis

```python
def frequency_analysis(data):
    """
    Calculate frequency distribution.
    
    Parameters:
    data (list or array-like): Data to analyze
    
    Returns:
    dict: Dictionary containing unique values and their counts
    """
    unique_values, counts = np.unique(np.array(data), return_counts=True)
    return dict(zip(unique_values, counts))

# Example usage
data = [1, 2, 2, 3, 3, 3, 4, 4, 5]
print(frequency_analysis(data))
```

## Data Analysis Functions

### Distribution Analysis

```python
def analyze_distribution(data):
    """
    Analyze the distribution of data.
    
    Parameters:
    data (list or array-like): Numerical data
    
    Returns:
    dict: Distribution characteristics
    """
    data = np.array(data)
    return {
        'skewness': float(stats.skew(data)),
        'kurtosis': float(stats.kurtosis(data)),
        'variance': float(np.var(data)),
        'range': float(np.ptp(data)),
        'iqr': float(stats.iqr(data))
    }
```

### Correlation Analysis

```python
def correlation_analysis(x, y):
    """
    Calculate correlation between two variables.
    
    Parameters:
    x, y (array-like): Variables to analyze
    
    Returns:
    dict: Different correlation coefficients
    """
    return {
        'pearson': stats.pearsonr(x, y),
        'spearman': stats.spearmanr(x, y)
    }
```

## Visualization Options

### Text-Based Visualization

```python
def text_histogram(data, bins=10):
    """
    Create a text-based histogram.
    
    Parameters:
    data (list or array-like): Data to visualize
    bins (int): Number of bins
    
    Returns:
    str: Text representation of histogram
    """
    data = np.array(data)
    hist, bin_edges = np.histogram(data, bins=bins)
    max_count = max(hist)
    
    result = []
    for count, edge in zip(hist, bin_edges[:-1]):
        bar = '#' * int(50 * count / max_count)
        result.append(f'{edge:6.2f} | {bar} ({count})')
    
    return '\n'.join(result)

# Example usage
data = np.random.normal(0, 1, 1000)
print(text_histogram(data))
```

### ASCII Box Plot

```python
def ascii_boxplot(data):
    """
    Create an ASCII box plot.
    
    Parameters:
    data (list or array-like): Data to visualize
    
    Returns:
    str: ASCII representation of box plot
    """
    data = np.array(data)
    q1, median, q3 = np.percentile(data, [25, 50, 75])
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr
    
    width = 50
    scale = width / (upper - lower)
    
    q1_pos = int((q1 - lower) * scale)
    med_pos = int((median - lower) * scale)
    q3_pos = int((q3 - lower) * scale)
    
    plot = ['-' * width]
    box = list(' ' * width)
    for i in range(q1_pos, q3_pos + 1):
        box[i] = '#'
    box[med_pos] = '|'
    plot.append(''.join(box))
    plot.append('-' * width)
    
    return '\n'.join(plot)
```

## Advanced Statistics

### Hypothesis Testing

```python
def hypothesis_test(group1, group2, test_type='t'):
    """
    Perform hypothesis testing between two groups.
    
    Parameters:
    group1, group2 (array-like): Groups to compare
    test_type (str): 't' for t-test, 'mann' for Mann-Whitney U test
    
    Returns:
    dict: Test results
    """
    if test_type == 't':
        statistic, pvalue = stats.ttest_ind(group1, group2)
    elif test_type == 'mann':
        statistic, pvalue = stats.mannwhitneyu(group1, group2)
    
    return {
        'test_type': test_type,
        'statistic': float(statistic),
        'p_value': float(pvalue)
    }
```

### Effect Size Calculations

```python
def effect_size(group1, group2):
    """
    Calculate effect size between two groups.
    
    Parameters:
    group1, group2 (array-like): Groups to compare
    
    Returns:
    dict: Different effect size measures
    """
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    
    # Pooled standard deviation
    pooled_sd = np.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    
    # Cohen's d
    d = (np.mean(group1) - np.mean(group2)) / pooled_sd
    
    return {
        'cohens_d': float(d),
        'effect_size_r': float(d / np.sqrt(d**2 + 4))
    }
```
