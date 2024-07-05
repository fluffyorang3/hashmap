function hashMap() {
  let arrayLength = 16;
  let array = new Array(arrayLength).fill(null);

  return {
    hash: function (key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode;
    },
    set: function (key, value) {
      let hashCode = this.hash(key);
      let index = hashCode % arrayLength;

      let newNode = { key, value, next: null };

      if (array[index] === null) {
        array[index] = newNode;
      } else {
        let current = array[index];

        while (current.next !== null) {
          if (current.key === key) {
            current.value = value;
            return;
          }
          current = current.next;
        }
        if (current.key === key) {
          current.value = value;
        } else {
          current.next = newNode;
        }
      }
    },
    get: function (key) {
      let hashCode = this.hash(key);
      let index = hashCode % arrayLength;

      let current = array[index];
      while (current !== null) {
        if (current.key === key) {
          return current.value;
        }
        current = current.next;
      }
      return undefined;
    },
  };
}
