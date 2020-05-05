
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scores').del()
    .then(function () {
      // Inserts seed entries
      return knex('scores').insert([
        {display_name: 'kristine', time: 14, difficulty: 'Easy'},
        {display_name: 'kristine', time: 10, difficulty: 'Easy'},
        {display_name: 'samuel', time: 12, difficulty: 'Easy'}
      ]);
    });
};
