import { describe, it, expect } from 'vitest';
import { render } from 'lit';
import { cardContent } from '../src/components/card-content.js';
import { AirQualityCard } from '../../air-quality/src/air-quality-card.js';
import { PoolMonitorCard } from '../../pool-monitor/src/pool-monitor-card.js';

// Found by looking at the screen, not by unit tests. The card announced 20 ppm
// of carbon monoxide as "Ideal", more than twice the WHO eight-hour guideline
//, and 3 ppm of perfectly good air as "Too Low", in blue. Both come from the
// same cause: a monotonic scale was being described with the vocabulary and the
// gradient of a centric one, whose middle band is by construction the ideal.
//
// The test that was supposed to cover this only asserted that two readings had
// different colours, which stays true when every band is wrong.

const co = ppm => {
  const card = new AirQualityCard();
  card.hass = {
    states: {
      'sensor.co': { state: String(ppm), attributes: {}, last_updated: '2026-08-15T10:00:00Z' },
    },
    entities: {},
  };
  card.setConfig({ sensors: { co: { entity: 'sensor.co' } } });
  return card.processData().co_1;
};

const pool = (sensor, state) => {
  const card = new PoolMonitorCard();
  card.hass = {
    states: {
      'sensor.x': { state: String(state), attributes: {}, last_updated: '2026-08-15T10:00:00Z' },
    },
    entities: {},
  };
  card.setConfig({ sensors: { pm25: sensor } });
  return card.processData().pm25_1;
};

describe('a monotonic scale is not described as a centric one', () => {
  it('never calls a middle band ideal, 20 ppm of CO is not an ideal reading', () => {
    expect(co(20).state).not.toBe('Ideal');
    expect(co(20).state).toBe('Moderate');
  });

  it('never calls clean air too low', () => {
    expect(co(3).state).not.toBe('Too Low');
    expect(co(3).state).toBe('Good');
  });

  it('names every band from good to bad, with no centric wording left', () => {
    expect([3, 7, 20, 50, 120].map(ppm => co(ppm).state)).toEqual([
      'Good',
      'Fair',
      'Moderate',
      'Poor',
      'Very Poor',
    ]);
  });

  it('reverses the names when higher is better, and not the order they read in', () => {
    const orp = {
      entity: 'sensor.x',
      limits: [400, 550, 650, 750],
      direction: 'higher_is_better',
      min: 300,
      max: 900,
    };
    expect(pool(orp, 800).state).toBe('Good');
    expect(pool(orp, 320).state).toBe('Very Poor');
  });
});

describe('the bar is painted the way the reading is classified', () => {
  it('starts green and ends on the worst colour, rather than red at the clean end', () => {
    const stops = co(3).monotonic_stops;
    expect(stops).toBeDefined();
    expect(stops.startsWith('#00b894')).toBe(true);
    expect(stops).toContain('#8e44ad');
    // cool is the centric palette's low end; on a pollutant it reads as a fault
    expect(stops).not.toContain('#00BFFF');
  });

  it('changes colour on the thresholds the labels announce', () => {
    const d = co(3);
    // limits [6, 9, 30, 87] over a 0..87 bar
    const positions = d.monotonic_stops
      .split(', ')
      .map(s => Number(s.split(' ')[1].replace('%', '')));
    expect(positions.map(p => Math.round(p * 10) / 10)).toEqual(
      d.label_positions.map(p => Math.round(p * 10) / 10),
    );
  });

  it('uses the same colours the badge is classified with', () => {
    const stops = co(20)
      .monotonic_stops.split(', ')
      .map(s => s.split(' ')[0]);
    expect(stops[2]).toBe(co(20).color); // 20 ppm lands in the third band
  });

  it('leaves a centric scale alone', () => {
    expect(
      pool({ entity: 'sensor.x', setpoint: 7.2, step: 0.2 }, 7.2).monotonic_stops,
    ).toBeUndefined();
  });
});

// The two blocks above only prove what the card computes. The gradient is
// written in the template, and there are two of them, full and compact. A
// value that never reaches the style attribute is a value nobody sees.
//
// Asserting on a single colour is not enough: the centric gradient also
// contains the green, and never contains the blue, so a test written that way
// passes with the gradient unplugged. The assertion has to be the whole stop
// list, which no other shape can produce.
describe('the gradient reaches the page, in both layouts', () => {
  const paint = generate => {
    const card = new AirQualityCard();
    card.hass = {
      states: {
        'sensor.co': { state: '3', attributes: {}, last_updated: '2026-08-15T10:00:00Z' },
      },
      entities: {},
    };
    card.setConfig({ sensors: { co: { entity: 'sensor.co' } } });
    const data = card.processData().co_1;
    const host = document.createElement('div');
    render(generate(card.getConfig(), data), host);
    return {
      style: host.querySelector('.progress-bar-child')?.getAttribute('style') ?? '',
      stops: data.monotonic_stops,
    };
  };

  it('full layout paints the monotonic stops', () => {
    const { style, stops } = paint(cardContent.generateBody);
    expect(style).toContain(stops);
  });

  it('compact layout paints them too', () => {
    const { style, stops } = paint(cardContent.generateCompactBody);
    expect(style).toContain(stops);
  });

  it('and the centric gradient is what would be painted instead', () => {
    // Guards the test above: this is the colour the centric shape puts at the
    // clean end, and it must not survive on a monotonic bar.
    const { style } = paint(cardContent.generateBody);
    expect(style.startsWith('background: linear-gradient(to right, #e17055')).toBe(false);
  });
});
