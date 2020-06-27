'use strict';

const axios = use('axios');

class GetScenesController {
  index({request}) {
    const {
      cloudCover,
      dateEnd,
      dateInit,
      listIds,
    } = request.post();
    const cloud = cloudCover
    const endDate = dateEnd
    const initDate = dateInit
    const onId = listIds
    const value = this.normalizeScenes({cloud, endDate, initDate, onId})
    const { data } = await axios.post(`${process.env.IA_ENDPOINT}/generate-mask`, value);
    
    return {message:'ok'}
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