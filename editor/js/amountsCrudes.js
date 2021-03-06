/**
 * Copyright 2020 Open Reaction Database Project Authors
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

goog.provide('ord.amountsCrudes');

goog.require('proto.ord.Mass');
goog.require('proto.ord.Volume');

ord.amountsCrudes.load = function (node, mass, volume) {
  const amount = $('.amount', node);
  $('.crude_amount_units_mass', node).hide();
  $('.crude_amount_units_volume', node).hide();
  if (mass) {
    $("input[value='mass']", amount).prop('checked', true);
    $('.crude_amount_value', node).text(mass.getValue());
    $('.crude_amount_precision', node).text(mass.getPrecision());
    $('.crude_amount_units_mass', node).show();
    setSelector(
        $('.crude_amount_units_mass', amount), mass.getUnits());
  }
  if (volume) {
    $("input[value='volume']", amount).prop('checked', true);
    $('.crude_amount_value', node).text(volume.getValue());
    $('.crude_amount_precision', node).text(volume.getPrecision());
    $('.crude_amount_units_volume', node).show();
    setSelector(
        $('.crude_amount_units_volume', amount), volume.getUnits());
  }
};

ord.amountsCrudes.unload = function (node, crude) {
  const mass = ord.amountsCrudes.unloadMass(node);
  const volume = ord.amountsCrudes.unloadVolume(node);
  if (mass) {
    crude.setMass(mass);
  }
  if (volume) {
    crude.setVolume(volume);
  }
};

ord.amountsCrudes.unloadMass = function (node) {
  if (!$('.crude_amount_mass', node).is(':checked')) {
    return null;
  }
  const mass = new proto.ord.Mass();
  const value = parseFloat($('.crude_amount_value', node).text());
  if (!isNaN(value)) {
    mass.setValue(value);
  }
  const units = getSelector($('.crude_amount_units_mass', node));
  mass.setUnits(units);
  const precision =
      parseFloat($('.crude_amount_precision', node).text());
  if (!isNaN(precision)) {
    mass.setPrecision(precision);
  }
  return mass;
};

ord.amountsCrudes.unloadVolume = function (node) {
  if (!$('.crude_amount_volume', node).is(':checked')) {
    return null;
  }
  const volume = new proto.ord.Volume();
  const value = parseFloat($('.crude_amount_value', node).text());
  if (!isNaN(value)) {
    volume.setValue(value);
  }
  const units = getSelector($('.crude_amount_units_volume', node));
  volume.setUnits(units);
  const precision =
      parseFloat($('.crude_amount_precision', node).text());
  if (!isNaN(precision)) {
    volume.setPrecision(precision);
  }
  return volume;
};
