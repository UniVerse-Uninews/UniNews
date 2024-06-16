import cron from 'node-cron';
import { updateAllUniversities } from './update-news';

cron.schedule('0 * * * *', () => {
  console.log('Running the news update job...');
  updateAllUniversities().catch(error => console.error('Error running news update job:', error));
});
