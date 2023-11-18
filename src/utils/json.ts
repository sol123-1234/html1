export const renderJson = (object: any) => {
  return JSON.stringify(object, (_key, value) => {
    switch (typeof value) {
      case 'bigint':
        return {  // warpper
          $T$: 'bigint',         // type   // maybe it is good to use some more complicated name instead of $T$
          $V$: value.toString()  // value  // maybe it is good to use some more complicated name instead of $V$
        };
      // Put more cases here ...
      default:
        return value;
    }
  });
};

export const pareseJson = (json: any) => {
  return JSON.parse(json, (_key, value) => {
    if (typeof value === 'object') {
      switch (value?.$T$) {
        case 'bigint':  // warpper
          return BigInt(value.$V$);
        // Put more cases here ...
        default:
          return value;
      }
    } else {
      return value;
    }
  });
};