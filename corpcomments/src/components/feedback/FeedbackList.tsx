import FeedbackItem from "./FeedBackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { filteredFeedbackItems, isLoading, errorMessage } =
    useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map((filteredFeedbackItems) => {
        return (
          <FeedbackItem
            key={filteredFeedbackItems.id}
            feedbackItem={filteredFeedbackItems}
          />
        );
      })}
    </ol>
  );
}
function aysnc() {
  throw new Error("Function not implemented.");
}
