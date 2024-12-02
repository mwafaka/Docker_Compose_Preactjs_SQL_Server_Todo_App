const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SQL Server database connection configuration
const {HOST,DB_USER,PASSWORD,DB_NAME}= process.env;

const config = {
    user:DB_USER,
    password: PASSWORD,
    server: HOST, // or 'localhost' if using SQL Server locally
    database: DB_NAME,
    port:  1433,  // Default port for SQL Server is 1433
    options: {
      encrypt: false, // Use encryption if necessary (for Azure, for example) 
      enableArithAbort: true,
      trustServerCertificate: true, // Set to true if using self-signed certificates (in development environments)
    },
  };

  sql.on('error', err => {
    console.error('SQL Error:', err);
  });
 

  const createTableQuery = `
  USE DockerApp;
  IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='todos' AND xtype='U')
  CREATE TABLE todos (
    id INT PRIMARY KEY,
    task NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
    
  );
`;

// initialize the global variable db;
let db;

// create the connection with the database
  sql.connect(config)
  .then(pool => {
    console.log('Connected to SQL Server successfully');
    db = pool;
    return db.request().query(createTableQuery)
   // return pool.request().query("CREATE DATABASE DockerApp");
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

  
// Routes
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results.recordset);
  });
});

// post request 
 app.post('/api/todos', async (req, res) => {
  const { task } = req.body;
    try {
    const result = await db
      .request()
      .input('task', sql.NVarChar, task)
      .query('INSERT INTO todos (task) OUTPUT INSERTED.* VALUES (@task);');
    

    res.json({response:result.recordset} ); 
  } catch (err) {
    console.error('SQL Insert Error:', err);
    res.status(500).send('Failed to add todo');
  }
}); 

// Delete request
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID parameter
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }

  try {
    // Use a parameterized query to delete the todo
    const request = db.request();
    request.input('id', sql.Int, id);

    const result = await request.query('DELETE FROM todos WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      // If no rows were deleted, the ID does not exist
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Successful deletion
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('SQL Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
