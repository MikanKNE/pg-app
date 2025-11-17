// 乱数のインポート
use rand::Rng;

fn main() {
    println!("Hello, world!");

    println!("-----------問題1-----------");
    let mut rng = rand::thread_rng();

    // randoms: 0〜99 の乱数を10個生成
    let randoms: Vec<u32> = (0..10)
        .map(|_| rng.gen_range(0..100))
        .collect();

    // input: 0〜99 の乱数を3個生成
    let input: Vec<u32> = (0..3)
        .map(|_| rng.gen_range(0..100))
        .collect();

    // randoms と input の表示
    println!("randoms = {:?}", randoms);
    println!("input   = {:?}", input);

    // input の数字が randoms に何個含まれているか数える
    for value in &input {
        let count = randoms.iter().filter(|&x| x == value).count();
        println!("値 {} は randoms に {} 個含まれています", value, count);
    }

    println!("-----------問題2-----------");
     // randoms: 10個生成
    let randoms = generate_random_numbers(10);

    // input: 3個生成
    let input = generate_random_numbers(3);

    // 表示
    println!("randoms = {:?}", randoms);
    println!("input   = {:?}", input);

    // input の数字が randoms に何個含まれているか判定
    for value in &input {
        let count = randoms.iter().filter(|&x| x == value).count();
        println!("値 {} は randoms に {} 個含まれています", value, count);
    }
    
    println!("-----------問題3-----------");
    let input = generate_random_numbers(3);
    println!("input = {:?}", input);

    let mut count = 0;
    loop {
        count += 1;

        // randoms を10個生成
        let randoms = generate_random_numbers(10);
        println!("試行 {} 回目 randoms = {:?}", count, randoms);

        // input の値がすべて randoms に含まれているか確認
        let all_included = input.iter().all(|v| randoms.contains(v));

        if all_included {
            println!("全ての input の値が randoms に含まれました！");
            println!("繰り返し回数: {}", count);
            break;
        }
    }

    println!("-----------問題4-----------");
    let mut rs = RandomSet::new(3, 10);

    println!("input = {:?}", rs.input);

    let mut count = 0;
    loop {
        count += 1;

        // randoms を再生成
        rs.regenerate_randoms(10);
        println!("試行 {} 回目 randoms = {:?}", count, rs.randoms);

        if rs.contains_all_input() {
            println!("全ての input の値が randoms に含まれました！");
            println!("繰り返し回数: {}", count);
            break;
        }
    }

}

// 問題2
fn generate_random_numbers(n: usize) -> Vec<u32> {
    let mut rng = rand::thread_rng();
    (0..n).map(|_| rng.gen_range(0..100)).collect()
}

struct RandomSet {
    randoms: Vec<u32>,
    input: Vec<u32>,
}

impl RandomSet {
    // コンストラクタ：input と randoms を生成
    fn new(input_count: usize, randoms_count: usize) -> Self {
        Self {
            input: Self::generate_numbers(input_count),
            randoms: Self::generate_numbers(randoms_count),
        }
    }

    // 0〜99 の乱数を n 個生成する共通関数
    fn generate_numbers(n: usize) -> Vec<u32> {
        let mut rng = rand::thread_rng();
        (0..n).map(|_| rng.gen_range(0..100)).collect()
    }

    // randoms を作り直す
    fn regenerate_randoms(&mut self, count: usize) {
        self.randoms = Self::generate_numbers(count);
    }

    // randoms に input の値が全て含まれるか確認
    fn contains_all_input(&self) -> bool {
        self.input.iter().all(|v| self.randoms.contains(v))
    }
}