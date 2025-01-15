/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// DOMPoint is also used for difference between points
export function midpoint(point1, point2) {
  return new DOMPoint((point2.x + point1.x) / 2, (point2.y + point1.y) / 2);
}
export function distance(point1, point2) {
  const diff = displacement(point1, point2);
  return Math.sqrt(diff.x**2 + diff.y**2);
}
export function displacement(point1, point2) {
  return new DOMPoint(point2.x - point1.x, point2.y - point1.y);
}
export function createTranslationMatrix(diff) {
  return (new DOMMatrix()).translateSelf(diff.x, diff.y, diff.z);
}
export function createScalingMatrix(scaleX, scaleY, scaleZ) {
  return (new DOMMatrix()).scaleSelf(scaleX, scaleY, scaleZ);
}
