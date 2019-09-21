import models from '../models';

const { HighlightedText } = models;

const highlightsLogic = {
  /**
   * @description It updates the startIndex, StopIndex and stillExist of highlightedPortions
   * @param {Array} highlightedPortions
   * @param {String} body
   * @param {String} userId
   * @returns {Array} An array of the updated highlights
   */
  async updateHighlights(highlightedPortions, body, userId) {
    let updatedPortions = [];

    for (let i = 0; i < highlightedPortions.length; i += 1) {
      const { text: highlightedText } = highlightedPortions[i];

      // eslint-disable-next-line no-await-in-loop
      const thisHighlight = await HighlightedText.findOne({
        where: {
          id: highlightedPortions[i].id,
          userId
        }
      });

      if (thisHighlight) {
        const checkHighlightedText = body.includes(highlightedText);
        if (checkHighlightedText) {
          const startIndex = body.indexOf(highlightedText);
          const stopIndex = startIndex + highlightedText.length;
          const newHighlightId = `${startIndex}-${stopIndex}`;

          const thisUpdate = thisHighlight.update(
            {
              startIndex,
              stopIndex,
              highlightId: newHighlightId,
              stillExist: true
            },
            { returning: true }
          );
          updatedPortions.push(thisUpdate);
        } else {
          thisHighlight.update(
            {
              stillExist: false
            },
            { returning: true }
          );
        }
      }
    }

    updatedPortions = await Promise.all(updatedPortions);
    return updatedPortions;
  },

  /**
   * @description This method is used to create new tags abd return the created tag ids
   * @param {Object} body - the recently created sequelize article
   * @param {Array} highlightedPortions - An array of tags <= 5
   * @param {Object} res - the recently created sequelize article
   * @param {Object} next - the recently created sequelize article
   * @returns {Object} object - the sequelize object of article tags
   */
  checkUpdateParams(body, highlightedPortions) {
    const message = [];
    if (!highlightedPortions) {
      message.push('Please supply the highlighted portions');
    }
    if (!Array.isArray(highlightedPortions)) {
      message.push('Highlighted portions supplied must be an array');
    }
    if (!body) {
      message.push('This article has no content');
    }
    return message;
  }
};

export default highlightsLogic;
