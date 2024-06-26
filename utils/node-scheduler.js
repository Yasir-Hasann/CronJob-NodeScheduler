const nodeSchedule = require('node-schedule');

class NodeScheduler {
    constructor () {
        this.nodeSchedule = nodeSchedule;
    }

    /**
     * Schedule job
     * @param {Date} date job date time
     * @param {object} rule job pattern rule
     * @param {Function} func function
     * @returns {object} scheduler response
     */
    async schedule(parameters) {
        const { date, rule, func } = parameters;
        try {
            let response;
            if (date)
                response = nodeSchedule.scheduleJob(date, async function () {
                    await func();
                });
            if (rule)
                response = nodeSchedule.scheduleJob(rule, async function () {
                    await func();
                });

            console.log('-JOB-SCHEDULED-', response.name);
            return response;
        } catch (error) {
            console.error('-JOB-SCHEDULING-ERROR-', error);
            throw error;
        }

    }
}

module.exports = NodeScheduler;
