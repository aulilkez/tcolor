import xcolors from "../dist/index.mjs";

console.log("🧪 Running all tests...\n");

const tests = [
  // Basic tests
  {
    name: "Basic red",
    fn: () => xcolors("test").red(),
    expected: "\x1b[31mtest\x1b[39m",
  },
  {
    name: "Bold",
    fn: () => xcolors("test").bold(),
    expected: "\x1b[1mtest\x1b[22m",
  },
  {
    name: "Chain",
    fn: () => xcolors("test").red().bold(),
    expected: "\x1b[1m\x1b[31mtest\x1b[39m\x1b[22m",
  },
  {
    name: "Background",
    fn: () => xcolors("test").bgBlue(),
    expected: "\x1b[44mtest\x1b[49m",
  },
  {
    name: "Direct",
    fn: () => xcolors.green("test"),
    expected: "\x1b[32mtest\x1b[39m",
  },
  {
    name: "Strip",
    fn: () => xcolors.strip("\x1b[31mtest\x1b[0m"),
    expected: "test",
  },
  // Added Style tests
  {
    name: "Underline",
    fn: () => xcolors("test").underline(),
    expected: "\x1b[4mtest\x1b[24m",
  },
  {
    name: "Italic",
    fn: () => xcolors("test").italic(),
    expected: "\x1b[3mtest\x1b[23m",
  },
  {
    name: "Dim",
    fn: () => xcolors("test").dim(),
    expected: "\x1b[2mtest\x1b[22m",
  },
  {
    name: "Inverse",
    fn: () => xcolors("test").inverse(),
    expected: "\x1b[7mtest\x1b[27m",
  },
  {
    name: "Hidden",
    fn: () => xcolors("test").hidden(),
    expected: "\x1b[8mtest\x1b[28m",
  },
  {
    name: "Strikethrough",
    fn: () => xcolors("test").strikethrough(),
    expected: "\x1b[9mtest\x1b[29m",
  },
  // Added Color tests
  {
    name: "Green",
    fn: () => xcolors("test").green(),
    expected: "\x1b[32mtest\x1b[39m",
  },
  {
    name: "Blue",
    fn: () => xcolors("test").blue(),
    expected: "\x1b[34mtest\x1b[39m",
  },
  {
    name: "Cyan",
    fn: () => xcolors("test").cyan(),
    expected: "\x1b[36mtest\x1b[39m",
  },
  // Added Background tests
  {
    name: "Background Red",
    fn: () => xcolors("test").bgRed(),
    expected: "\x1b[41mtest\x1b[49m",
  },
  {
    name: "Background Green",
    fn: () => xcolors("test").bgGreen(),
    expected: "\x1b[42mtest\x1b[49m",
  },
  {
    name: "Background Cyan",
    fn: () => xcolors("test").bgCyan(),
    expected: "\x1b[46mtest\x1b[49m",
  },
  // Extended tests
  {
    name: "RGB xcolors",
    fn: () => xcolors("test").rgb(128, 128, 128),
    expected: "\x1b[38;5;244mtest\x1b[39m",
  },
  {
    name: "RGB background",
    fn: () => xcolors("test").bgRgb(128, 128, 128),
    expected: "\x1b[48;5;244mtest\x1b[49m",
  },
  {
    name: "Hex xcolors",
    fn: () => xcolors("test").hex("#ff0000"),
    expected: "\x1b[38;5;196mtest\x1b[39m",
  },
  {
    name: "Hex background",
    fn: () => xcolors("test").bgHex("#00ff00"),
    expected: "\x1b[48;5;46mtest\x1b[49m",
  },
  {
    name: "ANSI 256 xcolors",
    fn: () => xcolors("test").ansi256(201),
    expected: "\x1b[38;5;201mtest\x1b[39m",
  },
  {
    name: "ANSI 256 background",
    fn: () => xcolors("test").bgAnsi256(123),
    expected: "\x1b[48;5;123mtest\x1b[49m",
  },
  {
    name: "Truecolor (24-bit)",
    fn: () => xcolors("test").truecolor(10, 20, 30),
    expected: "\x1b[38;2;10;20;30mtest\x1b[39m",
  },
  {
    name: "Truecolor background",
    fn: () => xcolors("test").bgTruecolor(40, 50, 60),
    expected: "\x1b[48;2;40;50;60mtest\x1b[49m",
  },
  {
    name: "Gradient",
    fn: () => xcolors.gradient("test", ["#ff0000", "#0000ff"]),
    expected:
      "\x1b[38;2;255;0;0mt\x1b[38;2;170;0;85me\x1b[38;2;85;0;170ms\x1b[38;2;0;0;255mt\x1b[0m",
  },
  {
    name: "Rainbow",
    fn: () => xcolors.rainbow("yo"),
    expected: "\x1b[38;2;255;0;0my\x1b[38;2;148;0;211mo\x1b[0m",
  },
  {
    name: "ASCII Art Cat",
    fn: () =>
      xcolors("  /\\_/\\").red() +
      "\n" +
      xcolors(" ( o.o )").cyan() +
      "\n" +
      xcolors("  > ^ <").green(),
    expected:
      "\x1b[31m  /\\_/\\\x1b[39m\n" +
      "\x1b[36m ( o.o )\x1b[39m\n" +
      "\x1b[32m  > ^ <\x1b[39m",
  },
];

let passed = 0;
let failed = 0;

tests.forEach((test) => {
  const result = String(test.fn());
  const success = result === test.expected;

  if (success) {
    console.log(`✅ ${test.name} -> ${result}`);
    passed++;
  } else {
    console.log(`❌ ${test.name}`);
    console.log(`   Expected: ${JSON.stringify(test.expected)}`);
    console.log(`   Got:      ${JSON.stringify(String(result))}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}

