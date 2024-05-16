import './App.css';
import MessageWindow from './components/messageWindow';
import WorkersShowList from './components/workersShowList';

const m = {
  message_content: "aaaaaaa", date_time: Date.now(), read_status: true, status: "kkk"

}

const App = () => {
  return (
    <>
      <WorkersShowList />
      <MessageWindow props={m} />
    </>

  );
};


export default App;
