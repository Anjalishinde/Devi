from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import WordNetLemmatizer, PorterStemmer
from nltk.corpus import stopwords
import string

class FAQ:
    def __init__(self, QAdata):
        self.question = ""
        self.all_keys = set()
        self.qa = QAdata
        self.data = None
        self.x_data = []
        self.y_data = []

    # def modify_data(self):

    def perform_NLP(self, question):
        question = question.lower()
        question = word_tokenize(question)
        stop = stopwords.words("english")
        punctuations = list(string.punctuation)
        stop += punctuations
        clean_question = [w for w in question if not w in stop]
        ps = PorterStemmer()
        stemmed_question = [ps.stem(w) for w in clean_question]
        return stemmed_question


    def printRouteTree(self, path, root):
        if root == None:
            return

        # append this node to the path array
        path.append(root.data)

        if (root.left == None) and (root.right == None):
             self.data.append(path)

        # otherwise try both subtrees
        for child in root.children:
            self.printRoute(path, child)

        path.pop()


    def prepare_data(self):
        for row in self.qa:
            x = self.perform_NLP(row[0])
            self.x_data.append(x)
            self.y_data.append(row[1])
        print((self.x_data))
        print((self.y_data))


    # def prepare_data(self):
    #     new_x_data = []
    #     new_y_data = []
    #     new_q = []
    #     for row in self.data:
    #         n = len(row)
    #         x = row[:n-2]
    #         q = row[-2]
    #         y = row[-1]
    #
    #         x_new = ""
    #         for s in x:
    #             x_new += " " + s
    #
    #         x_new = self.perform_NLP(x_new)
    #
    #         new_x_data.append(x_new)
    #         new_y_data.append([y])
    #         new_q.append([q])
    #
    #     for row in new_x_data:
    #         self.all_keys.update(row)
    #
    #
    #     self.x_data = new_x_data
    #     self.y_data = new_y_data


    def findAnswer(self, question):
        processed_q = self.perform_NLP(question)
        print(processed_q)
        result = None

        max_till_now = 0
        for i in range(len(self.x_data)):
            x_row = self.x_data[i]
            significance = 0
            for word in x_row:
                if word in processed_q:
                    # print("found")
                    significance += 1
            if significance > max_till_now:
                max_till_now = significance
                result = i
        if max_till_now:
            return self.y_data[result]
        else:
            return "Please Try Again"