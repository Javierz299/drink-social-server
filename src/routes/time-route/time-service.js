const TimeService = {
    async getTimeStamp(db){
        return await db
            .select('created')
            .from('user')
    }
}

module.exports = TimeService;