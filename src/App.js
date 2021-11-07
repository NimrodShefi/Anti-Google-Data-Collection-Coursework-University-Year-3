import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <div id="app_details">
        <h1>Application Name</h1>
        <p>By logging in to your Google Account here, you are able to provide yourself increased privacy from Google's alogirthm by letting us visit many website under your name. 
          To ensure that you are completely comfortable in using our services, you are able to opt out of us loading some of the webistes on the list if you don't want. 
          In addition to that, to ensure your privacy, the moment you close the app, all the data stored about you in our systems will be deleted, unless you decide otherwise.</p>
      </div>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
    </body>
  );
}

export default App;
