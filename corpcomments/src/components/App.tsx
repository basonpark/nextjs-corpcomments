import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import FeedbackItemsContextProvider from "../contexts/FeedbackItemsContextProvider";
import Container from "./layout/Container";

function App() {
  return (
    <div className="app">
      <Footer />

      <FeedbackItemsContextProvider>
        <Container />

        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
