import { TvSetupParams, QuoteCalculationResult, QuoteCalculationItem, PricingConfig } from '../types';

export function calculateTvQuote(
  tv1: TvSetupParams,
  hasSecondTv: boolean,
  tv2: TvSetupParams | undefined,
  zipCode: string,
  pricing: PricingConfig
): QuoteCalculationResult {
  const items: QuoteCalculationItem[] = [];
  let subtotal = 0;
  let hasCustomItems = false;

  // TV 1 Calculation
  const tv1SizeConfig = pricing.tvSizes[tv1.tvSize] || { label: tv1.tvSize, price: 85 };
  items.push({
    id: 'tv1-base',
    nameEn: `TV 1 Mounting (${tv1SizeConfig.label})`,
    nameRu: `Монтаж ТВ 1 (диагональ ${tv1SizeConfig.label})`,
    price: tv1SizeConfig.price,
    noteEn: 'Includes professional wall stud alignment and heavy-duty structural hardware',
    noteRu: 'Включает поиск стоек и надёжный силовой крепёж',
  });
  subtotal += tv1SizeConfig.price;

  // TV 1 Wall material
  const wallConfig = pricing.wallMaterials[tv1.wallMaterial];
  if (wallConfig) {
    if (wallConfig.customQuote || wallConfig.surcharge === null) {
      items.push({
        id: 'tv1-wall-custom',
        nameEn: `Wall Surface: ${wallConfig.nameEn}`,
        nameRu: `Поверхность стены: ${wallConfig.nameRu}`,
        price: null,
        isCustomQuote: true,
        noteEn: 'Requires photo inspection to evaluate anchors & structure',
        noteRu: 'Требуется фото для подбора анкеров и оценки прочности',
      });
      hasCustomItems = true;
    } else if (wallConfig.surcharge > 0) {
      items.push({
        id: 'tv1-wall-surcharge',
        nameEn: `Masonry/Specialty Wall: ${wallConfig.nameEn}`,
        nameRu: `Специальная отделка: ${wallConfig.nameRu}`,
        price: wallConfig.surcharge,
        noteEn: 'Specialized carbide masonry drilling & specialized anchors',
        noteRu: 'Бурение алмазной/победитовой оснасткой и усиленные анкеры',
      });
      subtotal += wallConfig.surcharge;
    }
  }

  // TV 1 Fireplace
  if (tv1.aboveFireplace) {
    items.push({
      id: 'tv1-fireplace',
      nameEn: 'Installation Above Fireplace (TV 1)',
      nameRu: 'Установка над камином (ТВ 1)',
      price: pricing.fireplaceSurcharge,
      noteEn: 'Elevated working height & thermal clearance verification',
      noteRu: 'Работы на повышенной высоте и проверка теплового зазора',
    });
    subtotal += pricing.fireplaceSurcharge;
  }

  // TV 1 Mount Hardware
  if (tv1.mountOwnership === 'handyman_mount') {
    let mountCost = pricing.mounts.fixedMountProvided;
    let mountNameEn = 'Master-Supplied Fixed Mount';
    let mountNameRu = 'Фиксированный кронштейн от мастера';

    if (tv1.mountType === 'tilting') {
      mountCost = pricing.mounts.tiltingMountProvided;
      mountNameEn = 'Master-Supplied Tilting Mount';
      mountNameRu = 'Наклонный кронштейн от мастера';
    } else if (tv1.mountType === 'full_motion') {
      mountCost = pricing.mounts.fullMotionMountProvided;
      mountNameEn = 'Master-Supplied Full-Motion Articulating Mount';
      mountNameRu = 'Полноповоротный шарнирный кронштейн от мастера';
    }

    items.push({
      id: 'tv1-mount-hardware',
      nameEn: mountNameEn,
      nameRu: mountNameRu,
      price: mountCost,
      noteEn: 'High-gauge steel, UL rated for heavy displays',
      noteRu: 'Прочная сталь, рассчитан на вес больших экранов',
    });
    subtotal += mountCost;
  } else {
    items.push({
      id: 'tv1-mount-customer',
      nameEn: 'Customer-Supplied Bracket (Installation included)',
      nameRu: 'Кронштейн клиента (установка включена в базовый монтаж)',
      price: 0,
      noteEn: 'We will inspect hardware and load ratings on-site',
      noteRu: 'Проверим совместимость и комплектный крепёж на месте',
    });
  }

  // TV 1 Wire management
  if (tv1.wireManagement === 'raceway') {
    items.push({
      id: 'tv1-wires-raceway',
      nameEn: 'External Paintable Surface Raceway',
      nameRu: 'Внешний аккуратный кабель-канал под покраску',
      price: pricing.wireManagement.raceway,
      noteEn: 'Neat surface concealment cut to custom length',
      noteRu: 'Аккуратный короб нужной длины, окрашиваемый в цвет стены',
    });
    subtotal += pricing.wireManagement.raceway;
  } else if (tv1.wireManagement === 'in_wall_low_voltage') {
    items.push({
      id: 'tv1-wires-inwall',
      nameEn: 'In-Wall Low-Voltage Signal Pass-Through Kit',
      nameRu: 'Скрытая проходка слаботочных кабелей в стене',
      price: pricing.wireManagement.inWallLowVoltage,
      noteEn: 'For HDMI/audio cords through standard drywall cavities (no 110V power cords)',
      noteRu: 'Для сигнальных кабелей HDMI/звука в полом гипсокартоне (без силового шнура)',
    });
    subtotal += pricing.wireManagement.inWallLowVoltage;
  }

  // TV 1 Addons
  if (tv1.soundbar) {
    items.push({
      id: 'tv1-addon-soundbar',
      nameEn: 'Soundbar Mounting Beneath TV 1',
      nameRu: 'Монтаж саундбара под ТВ 1',
      price: pricing.addOns.soundbar,
    });
    subtotal += pricing.addOns.soundbar;
  }
  if (tv1.floatingShelf) {
    items.push({
      id: 'tv1-addon-shelf',
      nameEn: 'Floating Media Shelf Installation',
      nameRu: 'Установка навесной полки под медиа-приставку',
      price: pricing.addOns.floatingShelf,
    });
    subtotal += pricing.addOns.floatingShelf;
  }

  // Optional TV 2 Calculation (collected separately, no duplicate charges!)
  if (hasSecondTv && tv2) {
    const tv2SizeConfig = pricing.tvSizes[tv2.tvSize] || { label: tv2.tvSize, price: 85 };
    items.push({
      id: 'tv2-base',
      nameEn: `Second TV Mounting (${tv2SizeConfig.label})`,
      nameRu: `Монтаж второго ТВ (диагональ ${tv2SizeConfig.label})`,
      price: tv2SizeConfig.price,
      noteEn: 'Added to the same service appointment',
      noteRu: 'Выполняется в рамках того же выезда мастера',
    });
    subtotal += tv2SizeConfig.price;

    const wall2Config = pricing.wallMaterials[tv2.wallMaterial];
    if (wall2Config) {
      if (wall2Config.customQuote || wall2Config.surcharge === null) {
        items.push({
          id: 'tv2-wall-custom',
          nameEn: `TV 2 Wall Surface: ${wall2Config.nameEn}`,
          nameRu: `ТВ 2 Поверхность стены: ${wall2Config.nameRu}`,
          price: null,
          isCustomQuote: true,
        });
        hasCustomItems = true;
      } else if (wall2Config.surcharge > 0) {
        items.push({
          id: 'tv2-wall-surcharge',
          nameEn: `TV 2 Masonry/Specialty Wall: ${wall2Config.nameEn}`,
          nameRu: `ТВ 2 Специальная отделка: ${wall2Config.nameRu}`,
          price: wall2Config.surcharge,
        });
        subtotal += wall2Config.surcharge;
      }
    }

    if (tv2.aboveFireplace) {
      items.push({
        id: 'tv2-fireplace',
        nameEn: 'Installation Above Fireplace (TV 2)',
        nameRu: 'Установка над камином (ТВ 2)',
        price: pricing.fireplaceSurcharge,
      });
      subtotal += pricing.fireplaceSurcharge;
    }

    if (tv2.mountOwnership === 'handyman_mount') {
      let mount2Cost = pricing.mounts.fixedMountProvided;
      let mount2NameEn = 'TV 2 Master Fixed Mount';
      let mount2NameRu = 'ТВ 2 Фиксированный кронштейн от мастера';

      if (tv2.mountType === 'tilting') {
        mount2Cost = pricing.mounts.tiltingMountProvided;
        mount2NameEn = 'TV 2 Master Tilting Mount';
        mount2NameRu = 'ТВ 2 Наклонный кронштейн от мастера';
      } else if (tv2.mountType === 'full_motion') {
        mount2Cost = pricing.mounts.fullMotionMountProvided;
        mount2NameEn = 'TV 2 Master Full-Motion Mount';
        mount2NameRu = 'ТВ 2 Полноповоротный кронштейн от мастера';
      }

      items.push({
        id: 'tv2-mount-hardware',
        nameEn: mount2NameEn,
        nameRu: mount2NameRu,
        price: mount2Cost,
      });
      subtotal += mount2Cost;
    }

    if (tv2.wireManagement === 'raceway') {
      items.push({
        id: 'tv2-wires-raceway',
        nameEn: 'TV 2 Paintable Surface Raceway',
        nameRu: 'ТВ 2 Кабель-канал под покраску',
        price: pricing.wireManagement.raceway,
      });
      subtotal += pricing.wireManagement.raceway;
    } else if (tv2.wireManagement === 'in_wall_low_voltage') {
      items.push({
        id: 'tv2-wires-inwall',
        nameEn: 'TV 2 In-Wall Low-Voltage Pass-Through',
        nameRu: 'ТВ 2 Скрытая проходка слаботочных кабелей',
        price: pricing.wireManagement.inWallLowVoltage,
      });
      subtotal += pricing.wireManagement.inWallLowVoltage;
    }

    if (tv2.soundbar) {
      items.push({
        id: 'tv2-addon-soundbar',
        nameEn: 'Soundbar Mounting (TV 2)',
        nameRu: 'Монтаж саундбара (ТВ 2)',
        price: pricing.addOns.soundbar,
      });
      subtotal += pricing.addOns.soundbar;
    }
  }

  // Minimum order logic
  let total = subtotal;
  let minimumOrderFee = 0;
  if (total > 0 && total < pricing.minimumOrder) {
    minimumOrderFee = pricing.minimumOrder - total;
    items.push({
      id: 'minimum-adjustment',
      nameEn: `Minimum Service Call Adjustment (Base minimum $${pricing.minimumOrder})`,
      nameRu: `Корректировка до минимальной стоимости выезда (Базовый минимум $${pricing.minimumOrder})`,
      price: minimumOrderFee,
    });
    total = pricing.minimumOrder;
  }

  return {
    items,
    subtotal,
    minimumOrderFee,
    total,
    hasCustomItems,
    tv1Details: tv1,
    hasSecondTv,
    tv2Details: hasSecondTv ? tv2 : undefined,
    zipCode,
    disclaimerEn: 'Estimate for budgeting. Final total is confirmed after verifying photos and structural framing.',
    disclaimerRu: 'Предварительный расчёт для ориентира. Окончательная смета подтверждается после проверки фото стены и стоек.',
  };
}
