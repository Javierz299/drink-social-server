const TimeService = {
    async getTimeStamp(db){
        return db
            .select('created')
            .from('user')
    }
}

module.exports = TimeService;