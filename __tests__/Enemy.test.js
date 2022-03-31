const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.name).toBe('goblin');
  expect(enemy.weapon).toBe('sword');
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});

test("gets player's stats as an object", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getStats()).toHaveProperty('potions');
    expect(enemy.getStats()).toHaveProperty('health');
    expect(enemy.getStats()).toHaveProperty('strength');
    expect(enemy.getStats()).toHaveProperty('agility');
  });

  test('gets inventory from player or returns false', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getInventory()).toEqual(expect.any(Array));

    enemy.inventory = [];

    expect(enemy.getInventory()).toEqual(false);
  });

  test("gets player's health value", () => {
    const enemy = new Enemy('goblin', 'sword');
     expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));

  });

  test('checks if player is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
  });

  test('adds a potion to the inventory', () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldCount = enemy.inventory.length;

    enemy.addPotion(new Potion());
    expect(enemy.inventory.length).toBeGreaterThan(oldCount);
  });

  test("subtracts from player's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
  });

  /*test("gets player's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
  });

  test('uses a potion from inventory', () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = enemy.inventory.length;

    enemy.usePotion(1);

    expect(enemy.inventory.length).toBeLessThan(oldCount);
  });*/

  test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');
  
    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
  });