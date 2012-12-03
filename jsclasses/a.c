struct TopicH
{
	int numberWords;
	int wordLength; 
	string *sPtr; 
};

int main()
{
	TopicH fileWord;
	vector<TopicH> topicVector; 

	/*ifstream dataFile;
	dataFile.open("TopicHIn.txt", ios::in);

	if (dataFile.fail())
	{
		cout << "The input file could not be found. Program ending. " << endl; 
		endProgram();
		exit(1); 
	}*/

	readInput(topicVector, fileWord); 



}

int readInput(vector<TopicH> &topicVector, TopicH &fileWord)
{
	ifstream dataFile;
	dataFile.open("TopicHIn.txt", ios::in);
	string word;
	int count = 0; 
	 



	if (dataFile.fail())
	{
		cout << "The input file could not be found. Program ending. " << endl; 
		endProgram();
		exit(1); 
	}

	//TopicH *vector<TopicH> topicVector2;

	while (dataFile >> word)
	{
		topicVector[count].*sPtr = word; 
	}
}