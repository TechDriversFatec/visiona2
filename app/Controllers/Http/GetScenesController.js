'use strict';

// const STAT_API = 'https://sat-api.developmentseed.org';s
const axios = use('axios');

class GetScenesController {
  index({request}) {
    const {
      cloudCover,
      dateEnd,
      dateInit,
      ids,
    } = request.post();
    const cloud = cloudCover
    const endDate = dateEnd
    const initDate = dateInit
    const onId = ids
    const a = this.normalizeScenes({cloud, endDate, initDate, onId})
    console.log(a)

  }

  normalizeScenes({cloud, endDate, initDate, onId}) {
    return{
      dateInit: new Date(initDate),
      dateEnd: new Date(endDate),
      cloudCover: cloud,
      ids: onId,
    };
  }

}

module.exports = GetScenesController;