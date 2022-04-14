require("dotenv").config();
require("express-async-errors");
// swagger dependencies
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const connectDB = require("./db/connect");
const jobRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const auth = require("./middleware/authentication");

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
app.set("trust proxy", 1);
app.get("/", (request, response) =>
  response.send(
    "<h2>Jobs API service</h2><a href='/api-docs'>Documentation</a>"
  )
);

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// swagger document
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
