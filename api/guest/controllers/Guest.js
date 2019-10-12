'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  updateByInviteCode: async ctx => {
    try {
      const {
        id,
        invite_code,
        rsvp,
        allergies,
        diet,
        diet_other
      } = ctx.request.body;

      if (!id) {
        throw 'Missing guest id';
      }

      if (!invite_code) {
        throw 'Missing invite code';
      }

      if (rsvp == null) {
        throw 'Missing rsvp';
      }

      if (allergies == null) {
        throw 'Missing allergies';
      }

      if (!diet) {
        throw 'Missing diet';
      }

      if (diet === 'Other' && !diet_other) {
        throw 'Diet is set to other but missing diet_other';
      }

      const guest = await strapi.query('guest').findOne({ id });

      if (!guest) {
        throw 'Guest does not exist';
      }

      if (guest.invitation.invite_code !== invite_code) {
        throw 'Guest does not belong to this invitation';
      }

      await strapi
        .query('guest')
        .update({ id }, { rsvp, allergies, diet, diet_other });

      ctx.body = {};
      ctx.status = 200;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }
};
