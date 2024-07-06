function hashMap() {
  let array_length = 16;
  let array = new Array(array_length).fill(null);
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
      let index = hashCode % array_length;

      if (array[index] === null) {
        array[index] = { key, value, next: null };
      } else {
        let current = array[index];
        while (current) {
          if (current.key === key) {
            current.value = value;
            return;
          }
          if (current.next === null) {
            current.next = { key, value, next: null };
            return;
          }
          current = current.next;
        }
      }
    },
    get: function (key) {
      let hashCode = this.hash(key);
      let index = hashCode % array_length;
      let current = array[index];

      while (current) {
        if (current.key === key) {
          return current.value;
        }
        current = current.next;
      }
      return "Key not found";
    },
    has: function (key) {
      let hashCode = this.hash(key);
      let index = hashCode % array_length;
      let current = array[index];

      while (current) {
        if (current.key === key) {
          return true;
        }
        current = current.next;
      }
      return false;
    },
    remove: function (key) {
      let hashCode = this.hash(key);
      let index = hashCode % array_length;
      let current = array[index];
      let previous = null;

      while (current) {
        if (current.key === key) {
          if (previous === null) {
            array[index] = current.next;
          } else {
            previous.next = current.next;
          }
          return true;
        }
        previous = current;
        current = current.next;
      }
      return false;
    },
    length: function () {
      let length = 0;

      for (let i = 0; i < array_length; i++) {
        let current = array[i];
        if (current === null) {
          continue;
        }
        while (current) {
          if (current.key) {
            length++;
          }
          current = current.next;
        }
      }
      return length;
    },
    clear: function () {
      array = new Array(array_length).fill(null);
    },
  };
}
