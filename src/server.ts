import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000
    })
    app.listen(config.port, () => {
      console.log(`BlogChronicle app is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()
export default app;
