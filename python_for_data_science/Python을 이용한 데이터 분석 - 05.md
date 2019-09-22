# DataCamp - Cource 05 - Importing Data in Python (Part 1)

## Introduction and flat files

### Welcome to the course!

```python
filename = 'huck.txt'
file = open(filename, mode="r")
text = file.read()
file.close()
filename = 'huck.txt'
file = open(filename, mode="w")
file.close()
```

```python
with open('huck.txt','r') as file:
    print(file.read())
```
use system bash in ipython : `!`

### The importance of flat files in data science

flat file : files that containing records(= table data = consist of row fields and attributes)

### Importing flat files using Numpy

```python
import numpy as np
filname = 'test.txt'
data = np.loadtxt(filename, delimiter=",", skiprows=1, usecols=[0,2], dtype=str)
np.genfromtxt()
np.recfromcsv()
```

### Importing flat files using pandas

matrix : rows and columns

dataframe: observations and variables

```python
import pandas as pd
filename = 'file.csv'
data = pd.read_csv(filename)
```



## Importing data from other file types

### Introduction to other file types

pickled files = serialized(convert object to bytestream)

```python
import pickle
with open('pickled_file.pkl','rb') as file:
    data = pickle.load(file)
```

excel

```python
import pandas as pd
file = 'excel.xlsx'
data = pd.ExcelFile(file)
print(data.sheet_names)
df1 = data.parse('1960-1996')
df2 = data.parse(0)
```

### Importing SAS/Stata files using pandas

SAS

```python
import pandas as pd
from sas7bdat import SAS7BDAT
with SAS7BDAT('urbanpop.sas7bdat') as file:
    df_sas = file.to_data_frame()
```

Stata

```python
import pandas as pd
data = pd.read_stata('urbanpop.dta')
```

### Importing HDF5 files

HDF5

```python
import h5py
filename = 'something.hdf5'
data = h5py.File(filename, 'r')
print(type(data))
```

### Importing MATLAB files

MATLAB

```python
import scipy.io
filename = 'workspace.mat'
mat = scipy.io.loadmat(filename)
```

key = MATLAB variable names

values = objects assigned to variables



## Working with relational databases in Python

### Introduction to relational databases

Todd's 12 Rules/Commandments (13개의 rules)

### Creating a database engine in Python

SQLAlchemy로 SQLite

```python
from sqlalchemy import create_engine
engine = create_engine('sqlite:///Northwind.sqlite')
table_names = engine.table_names()
```

### Querying relational databases in Python

```python
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine('sqlite:///Northwind.sqlite')
con = engine.connect()
rs = con.execute("SELECT * FROM Orders")
df = pd.DataFrame(rs.fetchall())
# rs.fetchmany(size=5)
df.columns = rs.keys()
con.close()

print(df.head())
```

### Querying relational databases directly with pandas

```python
df = pd.read_sql_query("SELECT * FROM Orders", engine)
```

### Advanced Querying: exploiting table relationships

INNER JOIN + pandas

```python
## case 1
with engine.connect() as con:
    rs = con.execute("SELECT Title, Name FROM Album INNER JOIN Artist on Album.ArtistID = Artist.ArtistID")
    df = pd.DataFrame(rs.fetchall())
    df.columns = rs.keys()

# Print head of DataFrame df
print(df.head())
## case 2
# Execute query and store records in DataFrame: df
df = pd.read_sql_query("SELECT * FROM PlaylistTrack INNER JOIN Track on PlaylistTrack.TrackId = Track.TrackId WHERE Milliseconds < 250000",engine)

# Print head of DataFrame
print(df.head())
```