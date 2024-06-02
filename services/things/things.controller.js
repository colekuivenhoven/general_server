const Thing = require('./things.model');

/**
 * * Get all things
 * @param {*} req 
 * @param {*} res
 * @returns {Object} - All things as objects
 */
exports.getThings = async (req, res) => {
    try {
        const things = await Thing.find();
        res.json({ message: 'All things', data: things });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

/**
 * * Get all things by filter
 * @param {Object} req.body - The filter object
 * Operator Documentation: https://www.mongodb.com/docs/manual/reference/operator/query/
 * Examples:
 * - { name: 'John' }
 * - { $or: [ { name: 'John' }, { name: 'Jane' } ]
 * - { $and: [ { name: 'John' }, { age: 21 } ]
 * @param {*} res
 * @returns {Object} - The things by filter
 */ 
exports.getThingsByFilter = async (req, res) => {
    try {
        const things = await Thing.find(req.body);
        res.json({ message: 'All things by filter', data: things });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

/**
 * * Get thing by ID
 * @param {*} req 
 * @param {*} res
 * @returns {Object} - The thing object by ID
 */
exports.getThingById = async (req, res) => {
    try {
        const thing = await Thing.findById(req.params.id);
        res.json({ message: 'Thing by ID', data: thing });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

/**
 * * Create thing
 * @param {*} req 
 * @param {*} res
 * @returns {Object} - The created thing object
 */
exports.createThing = async (req, res) => {
    try {
        const thing = await Thing.create(req.body);
        res.json({ message: 'Thing created', data: thing });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

/**
 * * Update thing
 * @param {*} req
 * @param {*} res
 * @returns {Object} - The updated thing object
 */
exports.updateThing = async (req, res) => {
    try {
        const thing = await Thing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Thing updated', data: thing });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}

/**
 * * Delete thing
 * @param {*} req
 * @param {*} res
 * @returns {Object} - The deleted thing object
 */
exports.deleteThing = async (req, res) => {
    try {
        const thing = await Thing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Thing deleted', data: thing });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}