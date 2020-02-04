const ThingModel = require('./thing.model');

class ThingService {

  async Create(thing) {
    try {

      const thingRecord = await ThingModel.create(thing);
      return { thing: thingRecord };

    } catch (e) {
      return e;
    }

  }

  async GetThing(thingId){
    let thing = await ThingModel.findById(thingId);
    if (!thing) throw new Error('Thing not found');
    return thing;

  }

  async Update(thingId, newValues) {

    let thing = await ThingModel.findById(thingId);
    if (!thing) return res.json({ message: 'Thing not found' });
    Object.assign(thing, newValues);
    await thing.save();
    return thing;

  }

  async List(){
    let things = await ThingModel.find({});
    return things;
  }

  async Remove(thingId){
    let thingRemoved = await ThingModel.remove({ _id: thingId });
    return thingRemoved;
  }

}

module.exports = ThingService;
