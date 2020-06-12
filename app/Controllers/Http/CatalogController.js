'use strict';

const STAT_SPEC_URL = 'https://sat-api.developmentseed.org/stac/search';
const axios = use('axios');

class CatalogController {
  async search({ response, request }) {
    const {
      dateInit,
      dateEnd,
      cloudCover,
      page,
      bbox,
    } = this.normalizeSearchRequest(request.get());
    return this.getCatalog({ dateEnd, dateInit, cloudCover, page, bbox });
  }

  normalizeSearchRequest({ dateInit, dateEnd, cloudCover, page, bbox }) {
    return {
      dateInit: new Date(dateInit),
      dateEnd: new Date(dateEnd),
      cloudCover: parseInt(cloudCover, 10),
      page: parseInt(page, 10),
      bbox: bbox.map((val) => parseFloat(val, 10)),
    };
  }

  async getCatalog({ dateInit, dateEnd, cloudCover, page, bbox }) {
    const requestData = {
      bbox, // [-110, 39.5, -105, 40.5],
      time: `${dateInit.toISOString()}/${dateEnd.toISOString()}`, // '2020-01-01T00:00:00Z/2020-06-09T00:00:00Z',
      intersects: null,
      query: {
        'eo:cloud_cover': {
          lt: cloudCover,
          gt: -1,
        },
      },
      sort: [
        {
          field: 'eo:cloud_cover',
          direction: 'asc',
        },
      ],
      page,
      limit: 10,
    };
    const { data } = await axios.default.post(STAT_SPEC_URL, requestData);
    return this.normalizeCatalogData({ data });
  }

  normalizeCatalogData({ data }) {
    return {
      pagination: this.getCatalogPagination(data),
      list: this.normalizeFeature(data),
    };
  }

  getCatalogPagination({ meta: { page, limit, found } }) {
    return {
      page,
      limit,
      found,
      pages: Math.ceil(found / limit),
    };
  }

  normalizeFeature({ features }) {
    return features.map((feature) => {
      const {
        id,
        properties: { 'eo:cloud_cover': cloudCover, datetime, collection },
        assets: {
          thumbnail: { href: thumbnail },
        },
      } = feature;
      return {
        id,
        cloudCover,
        thumbnail,
        datetime,
        collection,
      };
    });
  }
}

module.exports = CatalogController;
