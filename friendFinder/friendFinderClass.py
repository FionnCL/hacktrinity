import sqlite3

class friendFinder:
    def __init__(self, db_path, user_id, day, hour, group_id):
        self.db_path = db_path
        self.user_id = user_id
        self.day = day
        self.hour = hour
        self.group_id = group_id
        self.freeFriends = []

    def single_hour(self):
        # Connect to the SQLite database
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Find the user_ids of all members of the group
        cursor.execute('''
            SELECT user_id FROM user_groups WHERE group_id = ?
        ''', (self.group_id,))
        group_member_ids = [row[0] for row in cursor.fetchall()]
        
        # For each member in the group, check if they are free at the given day and hour
        for member_id in group_member_ids:
            cursor.execute('''
                SELECT user_id FROM timetable 
                WHERE user_id = ? AND day = ? AND hour = ? AND status = TRUE
            ''', (member_id, self.day, self.hour))
            free_members = cursor.fetchall()
            
            # Append the free members to the freeFriends list
            for free_member in free_members:
                self.freeFriends.append(free_member[0])
        
        # Close the connection
        conn.close()
        
        return self.freeFriends

# Usage example:
# Assume we are looking for friends who are free in group 1 on Monday at 10:00
finder = friendFinder(db_path='db_sample.sqlite3', user_id=1, day='Monday', hour=10, group_id=1)
free_friends = finder.single_hour()
print(free_friends)
