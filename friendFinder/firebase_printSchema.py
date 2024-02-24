import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    'projectId': "lunchtime-38432",
})

# Initialize Firestore database
db = firestore.client()

# Function to fetch documents from a collection
def fetch_documents(collection_name):
    docs = db.collection(collection_name).stream()
    documents_list = []
    for doc in docs:
        doc_data = doc.to_dict()
        documents_list.append(doc_data)
    return documents_list

# Fetch documents from "users", "timetable", and "group" collections
users_data = fetch_documents("user")
timetable_data = fetch_documents("timetable")
group_data = fetch_documents("group")

# View document data
print("List of user data:", users_data)
print("List of timetable data:", timetable_data)
print("List of group data:", group_data)



#service_account_key_path = "lunchtime-38432-firebase-adminsdk-s19k9-01779b97a8.json"
#database_url = "https://lunchtime-38432.firebaseio.com"