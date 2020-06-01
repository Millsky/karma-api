const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg')
const app = new Koa();
const router = new Router({
  prefix: '/api/v1/'
});

let db = null;

const pool = new Pool();

console.log('Karma API is up and running!');

const users = {};

router
  .post('user', async (ctx, next) => {
      const { email } = ctx.request.body || {};
      console.log('Adding User', email);
      try {
        await pool.query(`CALL add_user($1)`, [email]);
        const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        ctx.body = res.rows[0];
      } catch (e) {
        console.log(e);
      }
      ctx.body = ctx.body || null;
  })
  .get('user/:id', async (ctx, next) => {
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
  .patch('user/:id', async (ctx, next) => {
    const { id } = ctx.params;
    console.log('Updating User', id);
    const { name, email } = ctx.request.body || {};
    users[id] = {
      id,
      name,
      email,
    };
  })
  .get('user/:id/karma', async (ctx, next) => {
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
  .post('karma', async (ctx, next) => {
    const { from_user_id, message, to_user_id } = ctx.request.body || {};
    console.log('Adding Karma', id);
    try {
      await pool.query(`CALL add_karma($1, $2, $3)`, [from_user_id, to_user_id, message]);
    } catch (e) {
      console.log(e);
    }
    ctx.body = {
      from_user_id,
      message,
      to_user_id: id,
    }
  })

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);
