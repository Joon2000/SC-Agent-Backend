const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/run-command', (req, res) => {
  exec('cd .. && yes | npx hardhat ignition deploy ./ignition/modules/Lock.ts --network sepolia', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.send(`Error: ${error}`);
    }
    res.send(`Command output: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});