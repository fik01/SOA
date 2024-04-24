db.createUser(
    {
        user: "root",
        pwd: "jemta",
        roles: [
            {
                role: "readWrite",
                db: "tour"
            }
        ]
    }
);