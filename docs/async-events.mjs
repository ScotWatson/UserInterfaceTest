/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Implements the async iterable interface
class EventIterable {
  #next;
  constructor(subscribe) {
    // subscribe acts as the subscribe function of an observable (takes an observer as an argument), except that complete also takes an optional value argument
    let _resolve = null;
    let _reject = null;
    const waitForInput = () => {
      this.#next = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });
    }
    function next(value) {
      _resolve({
        value,
        done: false,
      });
      waitForInput();
    }
    function complete(value) {
      _resolve({
        value,
        done: false,
      });
      waitForInput();
    }
    function error(reason) {
      _reject(reason);
      waitForInput();
    }
    subscribe({ next, complete, error });
    waitForInput();
  }
  [Symbol.asyncIterator]() {
    // This function may be called more than once, allowing for multiple consumers
    // Client code may stop consuming (calling next()) at any time, so values are not stored up after the last promise returned from next() is settled.
    return {
      next: () => {
        return new Promise((resolve, reject) => {
          this.#next.then(resolve, reject);
        });
      },
    };
  }
}
