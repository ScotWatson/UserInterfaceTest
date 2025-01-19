/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Implements the async iterable interface
class EventGenerator {
  #next;
  constructor(init) {
    let _resolve = null;
    let _reject = null;
    const next = () => {
      this.#next = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });
    }
    function generate(value) {
      _resolve({
        value,
        done: false,
      });
      next();
    }
    function final(value) {
      _resolve({
        value,
        done: false,
      });
      next();
    }
    function reject(reason) {
      _reject(reason);
      next();
    }
    init(generate, final, reject);
    next();
  }
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        return new Promise((resolve, reject) => {
          this.#next.then(resolve, reject);
        });
      },
    };
  }
}
