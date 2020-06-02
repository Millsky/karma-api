const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg');
const app = new Koa();
const router = new Router({
  prefix: '/api/v1/'
});

const pool = new Pool();

console.log('Karma API is up and running!');

router
  .post('user', async (ctx) => {
      const { email, first_name, last_name } = ctx.request.body || {};
      console.log('Adding User With:', email);
      try {
        const { rows } = await pool.query(`SELECT * FROM insert_user($1, $2, $3)`, [email, first_name, last_name]);
        const res = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
            rows[0].insert_user,
        ]);
        ctx.body = res.rows[0];
      } catch (e) {
        console.log(e);
      }
      ctx.body = ctx.body || null;
  })
  .get('user/:id', async (ctx) => {
      const { id } = ctx.params;
      console.log('Getting User', id);
      try {
        const res = await pool.query(`SELECT * FROM get_user($1)`, [id]);
        ctx.body = res.rows[0];
      } catch (e) {
        console.log(e);
      }
      ctx.body = ctx.body || null;
  })
  .get('user/:id/karma', async (ctx) => {
    const { id } = ctx.params;
    console.log('Getting Users Karma', id);
    try {
      const res = await pool.query(`SELECT * FROM get_user_karma($1)`, [id]);
      ctx.body = res.rows;
    } catch (e) {
      console.log(e);
    }
    ctx.body = ctx.body || null;
  })
  .post('karma', async (ctx) => {
    const { from_user_id, message, to_user_id, group_id } = ctx.request.body || {};
    let karma_id = null;
    try {
      const res = await pool.query(`SELECT * FROM insert_karma($1, $2, $3, $4)`, [from_user_id, to_user_id, group_id, message]);
      karma_id = res.rows[0].insert_karma;
    } catch (e) {
      console.log(e);
    }
    ctx.body = {
      from_user_id,
      message,
      group_id,
      to_user_id,
      karma_id,
    }
  })
  .post('group', async (ctx) => {
    const { name } = ctx.request.body || {};
    try {
        const res = await pool.query(`SELECT * FROM insert_group($1)`, [name]);
        ctx.body = res.rows[0].insert_group;
    } catch (e) {
      console.log(e);
    }
    ctx.body = ctx.body || null;
  })
  .get('group/:id', async (ctx) => {
    const { id } = ctx.params;
    try {
      const res = await pool.query('SELECT * FROM get_group($1)', [id]);
      ctx.body = res.rows[0];
    } catch (e) {
      console.log(e);
    }
    ctx.body = ctx.body || null;
  });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);
