//store is an entire object
import {create} from 'zustand';
import { TFeedbackItem } from '../lib/types';

type Store = {
    feedbackItems: TFeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    addItemToList: (text: string) => Promise<void>;
    selectCompany: (company: string) => void;
    fetchFeedbackItems: () => Promise<void>;
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
    feedbackItems: [], 
    isLoading: false,
    errorMessage: "",
    selectedCompany: "",
    getCompanyList: () => {
        return get()
            .feedbackItems.map((item) => item.company)
            .filter((company, index, array) => {
                return array.indexOf(company) === index;
            });
    },
    getFilteredFeedbackItems: () => {
        return get()
            .selectedCompany
            ? get().feedbackItems.filter(
                (feedbackItem) => feedbackItem.company === get().selectedCompany
            )
            : get().feedbackItems;
    },
    addItemToList: async (text: string) => {
        const companyName = text
          .split(" ")
          .find((word) => word.includes("#"))! //assures typescript that value will not be undefined
          .substring(1);
    
        const newItem: TFeedbackItem = {
          id: new Date().getTime(),
          text: text,
          upvoteCount: 0,
          daysAgo: 0,
          company: companyName,
          badgeLetter: companyName[0].toUpperCase(),
        };
    
        set(state => ({
            feedbackItems: [...state.feedbackItems, newItem]
        }));

        //post request
        await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
          {
            method: "POST",
            body: JSON.stringify(newItem), //converts object to JSON
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
    },
    selectCompany: (company: string) => {
        set(() => ({
            selectedCompany: company
        }));
    },
    fetchFeedbackItems: async () => { 
        set(() => ({
            isLoading: true
        }))
        try {
          const res = await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
          );
          if (!res.ok) {
            throw new Error();
          }
          const data = await res.json();
          
        set(() => ({
            feedbackItems: data.feedbacks
        }));

        } catch (error) {
          
        set(() => ({
            errorMessage: "Something went wrong"
        }));
        }
        set(() => ({
            isLoading: false
        }));
    },
}))