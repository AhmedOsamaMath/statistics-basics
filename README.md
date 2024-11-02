# Descriptive Statistics: A Comprehensive Guide

This document is designed to provide a thorough understanding of descriptive statistics, complete with practical examples and Python implementations for real-world data analysis.

## Table of Contents

1. [Introduction](#introduction)
2. [Types of Data](#types-of-data)
3. [Measures of Central Tendency](#measures-of-central-tendency)
4. [Measures of Dispersion](#measures-of-dispersion)
5. [Measures of Distribution Shape](#measures-of-distribution-shape)
6. [Position Measurements](#position-measurements)
7. [Visual Representations](#visual-representations)
8. [Comprehensive Example](#comprehensive-example)
9. [Practical Applications](#practical-applications)
10. [Conclusion](#conclusion)
11. [Contributing](#contributing)
12. [License](#license)

## Introduction

Descriptive statistics comprises methods for organizing, summarizing, and presenting data in an informative way. These techniques help researchers and analysts understand the main features of data collections without necessarily analyzing every single observation.

### Key Concepts

- **Population**: The complete set of all items of interest
- **Sample**: A subset of the population used for analysis
- **Parameter**: A numerical value that describes a population characteristic
- **Statistic**: A numerical value that describes a sample characteristic
- **Variable**: A characteristic or feature that can vary among the data points

## Types of Data

Understanding data types is crucial for choosing appropriate statistical measures.

### Qualitative (Categorical) Data

- **Nominal**: Categories with no natural order (e.g., colors, gender)
- **Ordinal**: Categories with a natural order (e.g., education levels)

### Quantitative (Numerical) Data

- **Discrete**: Countable values (e.g., number of children)
- **Continuous**: Measurable values on a continuous scale (e.g., height, weight)

## Measures of Central Tendency

These measures identify the center or typical value of a dataset.

### Mean

- **Definition**: The sum of all values divided by the number of values
- **Formula**: x̄ = (∑xᵢ)/n
- **Best used**: With continuous, symmetrically distributed data
- **Limitations**: Sensitive to outliers

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
mean = np.mean(data)  # 43.625
```

### Median

- **Definition**: The middle value when data is ordered
- **Formula**:
  - For odd n: Middle value
  - For even n: Average of two middle values
- **Best used**: With skewed distributions or ordinal data
- **Limitations**: Ignores actual values except middle observation(s)

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
median = np.median(data)  # 39.5
```

### Mode

- **Definition**: Most frequently occurring value
- **Best used**: With categorical data or discrete numerical data
- **Limitations**: May not be unique (multimodal data)

```python
from scipy import stats

data = [23, 45, 12, 67, 34, 89, 23, 56]
mode = stats.mode(data)  # Mode: 23, Count: 2
```

### Geometric Mean

- **Definition**: nth root of the product of n values
- **Formula**: G = (∏xᵢ)^(1/n)
- **Best used**: With ratios, rates, or exponential growth
- **Limitations**: Cannot be used with negative or zero values

```python
from scipy.stats import gmean

data = [23, 45, 12, 67, 34, 89, 23, 56]
geometric_mean = gmean(data)  # 37.97
```

## Measures of Dispersion

These measures describe how spread out the data is.

### Range

- **Definition**: Difference between maximum and minimum values
- **Formula**: Range = max(x) - min(x)
- **Limitations**: Extremely sensitive to outliers

```python
data = [23, 45, 12, 67, 34, 89, 23, 56]
range_value = max(data) - min(data)  # 77
```

### Variance

- **Definition**: Average squared deviation from the mean
- **Formula**: σ² = ∑(x - μ)²/N (population); s² = ∑(x - x̄)²/(n-1) (sample)
- **Properties**: Always non-negative, squared units

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
population_variance = np.var(data)     # Population variance
sample_variance = np.var(data, ddof=1) # Sample variance
```

### Standard Deviation

- **Definition**: Square root of variance
- **Formula**: σ = √σ² (population); s = √s² (sample)
- **Interpretation**: Average distance from the mean
- **Properties**: Same units as original data

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
population_std = np.std(data)     # Population standard deviation
sample_std = np.std(data, ddof=1) # Sample standard deviation
```

### Coefficient of Variation

- **Definition**: Standard deviation relative to mean
- **Formula**: CV = (s/x̄) × 100%
- **Best used**: Comparing dispersion between datasets with different units

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
cv = (np.std(data, ddof=1) / np.mean(data)) * 100  # CV as percentage
```

### Interquartile Range (IQR)

- **Definition**: Difference between 75th and 25th percentiles
- **Formula**: IQR = Q₃ - Q₁
- **Best used**: With skewed distributions
- **Properties**: Resistant to outliers

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
q75, q25 = np.percentile(data, [75, 25])
iqr = q75 - q25
```

## Measures of Distribution Shape

### Skewness

- **Definition**: Measure of asymmetry
- **Formula**: γ₁ = E[(X-μ)³]/σ³
- **Interpretation**:
  - Positive: Right-skewed
  - Negative: Left-skewed
  - Zero: Symmetric

```python
from scipy.stats import skew

data = [23, 45, 12, 67, 34, 89, 23, 56]
skewness = skew(data)
```

### Kurtosis

- **Definition**: Measure of tailedness
- **Formula**: γ₂ = E[(X-μ)⁴]/σ⁴ - 3
- **Interpretation**:
  - Positive: Heavy-tailed
  - Negative: Light-tailed
  - Zero: Normal distribution

```python
from scipy.stats import kurtosis

data = [23, 45, 12, 67, 34, 89, 23, 56]
kurt = kurtosis(data)
```

## Position Measurements

### Percentiles

- **Definition**: Values dividing dataset into 100 equal parts
- **Key percentiles**:
  - 25th (Q₁)
  - 50th (Median)
  - 75th (Q₃)

```python
import numpy as np

data = [23, 45, 12, 67, 34, 89, 23, 56]
q1 = np.percentile(data, 25)  # 23.0
q2 = np.percentile(data, 50)  # 39.5 (median)
q3 = np.percentile(data, 75)  # 61.5
```

### Z-scores

- **Definition**: Number of standard deviations from mean
- **Formula**: z = (x - μ)/σ
- **Uses**: Standardizing data, identifying outliers

```python
from scipy import stats

data = [23, 45, 12, 67, 34, 89, 23, 56]
z_scores = stats.zscore(data)
```

## Visual Representations

### Frequency Distributions

- **Frequency Table**: Organizes data into categories
- **Relative Frequency**: Proportion of observations in each category
- **Cumulative Frequency**: Running total of frequencies

```python
import pandas as pd

data = [23, 45, 12, 67, 34, 89, 23, 56]
freq_table = pd.Series(data).value_counts()
rel_freq = pd.Series(data).value_counts(normalize=True)
```

### Graphical Displays

1. **Histograms**
   - Best for: Continuous data
   - Shows: Distribution shape, center, spread

   ```python
   import matplotlib.pyplot as plt

   data = [23, 45, 12, 67, 34, 89, 23, 56]
   plt.hist(data, bins='auto', edgecolor='black')
   plt.title('Histogram')
   plt.xlabel('Value')
   plt.ylabel('Frequency')
   plt.show()
   ```

2. **Box Plots**
   - Best for: Detecting outliers, comparing groups
   - Shows: Five-number summary (min, Q₁, median, Q₃, max)

   ```python
   import matplotlib.pyplot as plt

   data = [23, 45, 12, 67, 34, 89, 23, 56]
   plt.boxplot(data)
   plt.title('Box Plot')
   plt.show()
   ```

3. **Stem-and-Leaf Plots**
   - Best for: Small to medium datasets
   - Shows: Distribution while preserving data values
4. **Bar Charts**
   - Best for: Categorical data
   - Shows: Frequencies or proportions

   ```python
   import pandas as pd
   import matplotlib.pyplot as plt

   data = [23, 45, 12, 67, 34, 89, 23, 56]
   pd.Series(data).value_counts().plot(kind='bar')
   plt.title('Bar Chart')
   plt.xlabel('Value')
   plt.ylabel('Frequency')
   plt.show()
   ```

5. **Pie Charts**
   - Best for: Parts of a whole
   - Shows: Relative proportions

6. **Violin Plots**

   ```python
   import seaborn as sns

   data = [23, 45, 12, 67, 34, 89, 23, 56]
   sns.violinplot(data=data)
   plt.title('Violin Plot')
   plt.show()
   ```

## Comprehensive Example

```python
import numpy as np
from scipy import stats
import pandas as pd

def describe_data(data):
    """Calculate comprehensive descriptive statistics"""
    
    # Central Tendency
    stats_dict = {
        'Mean': np.mean(data),
        'Median': np.median(data),
        'Mode': stats.mode(data).mode[0],
        'Geometric Mean': stats.gmean(data),
        
        # Dispersion
        'Range': np.ptp(data),
        'Variance (sample)': np.var(data, ddof=1),
        'Std Dev (sample)': np.std(data, ddof=1),
        'Coefficient of Variation': (np.std(data, ddof=1) / np.mean(data)) * 100,
        'IQR': np.percentile(data, 75) - np.percentile(data, 25),
        
        # Shape
        'Skewness': stats.skew(data),
        'Kurtosis': stats.kurtosis(data),
        
        # Position
        '25th Percentile': np.percentile(data, 25),
        '75th Percentile': np.percentile(data, 75)
    }
    
    return pd.Series(stats_dict)

# Example usage
data = [23, 45, 12, 67, 34, 89, 23, 56]
results = describe_data(data)
print(results)
```

## Practical Applications

### Example 1: Analyzing Student Scores

```python
import numpy as np
import pandas as pd
from scipy import stats

# Sample student scores
scores = [85, 92, 78, 65, 88, 95, 73, 88, 82, 91]

# Basic statistics
print(f"Average score: {np.mean(scores):.2f}")
print(f"Median score: {np.median(scores)}")
print(f"Standard deviation: {np.std(scores, ddof=1):.2f}")
print(f"Score range: {np.ptp(scores)}")

# Check for normality
_, p_value = stats.normaltest(scores)
print(f"Normal distribution p-value: {p_value:.4f}")
```

### Example 2: Sales Data Analysis

```python
import numpy as np
import pandas as pd

# Monthly sales data
sales = [12500, 15000, 14200, 16700, 13400, 15800, 14900, 15200, 16300, 15900, 16200, 17100]

# Calculate year-over-year growth rates
growth_rates = np.diff(sales) / sales[:-1] * 100

print(f"Average monthly sales: ${np.mean(sales):,.2f}")
print(f"Sales growth statistics:")
print(f"  Average monthly growth: {np.mean(growth_rates):.1f}%")
print(f"  Highest monthly growth: {np.max(growth_rates):.1f}%")
print(f"  Lowest monthly growth: {np.min(growth_rates):.1f}%")
```

### Business

- Sales analysis
- Quality control
- Customer satisfaction surveys
- Market research

### Science

- Experimental results
- Environmental measurements
- Population studies
- Laboratory data

### Social Sciences

- Demographic analysis
- Survey results
- Behavioral studies
- Educational assessments

## Conclusion

Descriptive statistics form the backbone of data analysis, helping transform raw data into meaningful insights. By leveraging Python, analyzing data becomes efficient and reproducible.

## Contributing

Feel free to submit pull requests or open issues for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
