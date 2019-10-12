'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  updateByInviteCode: async ctx => {
    try {
      const { email, invite_code } = ctx.request.body;

      if (!email) {
        throw 'Missing email';
      }

      if (!invite_code) {
        throw 'Missing invite code';
      }

      const invitation = await strapi
        .query('invitation')
        .update({ invite_code }, { email });
      if (!invitation) {
        throw 'Invitation does not exist';
      }
      ctx.body = {};
      ctx.status = 200;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  },

  retrieveGuestsByInviteCode: async ctx => {
    try {
      const { invite_code } = ctx.request.body;

      if (!invite_code) {
        throw 'Missing invite code';
      }

      const invitation = await strapi
        .query('invitation')
        .findOne({ invite_code });

      if (!invitation) {
        throw 'Invitation does not exist';
      }

      await strapi.query('invitation').update({ invite_code }, { seen: true });

      ctx.body = invitation.guests.map(guest => guest.id);
      ctx.status = 200;
    } catch (err) {
      ctx.body = err;
      console.log(err);
      ctx.status = 500;
    }
  }
};
