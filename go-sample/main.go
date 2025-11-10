package main // パッケージ宣言（必須）

import (
	"fmt"
	"math/rand"
) // インポート宣言

func main() { // エントリーポイント
	fmt.Println("Hello, Go!")

	// 問題1
	fmt.Println("----------問題1----------")
	var randoms []int = make([]int, 10)
	for i := 0; i < 10; i++ {
		randoms[i] = rand.Intn(100)
	}
	fmt.Println(randoms)

	var input []int = make([]int, 3)
	for i := 0; i < 3; i++ {
		input[i] = rand.Intn(100)
	}
	fmt.Println(input)

	count := 0
	for i := 0; i < len(randoms); i++ {
		for j := 0; j < len(input); j++ {
			if randoms[i] == input[j] {
				count++
			}
		}
	}
	fmt.Printf("%d個\n", count)

	// 問題2
	fmt.Println("----------問題2----------")
	fmt.Println(generateRandoms(5))

	// 問題3
	fmt.Println("----------問題3----------")
	attempts := 0
	for {
		attempts++
		randoms = generateRandoms(10)
		matchCount := 0

		for i := 0; i < len(randoms); i++ {
			for j := 0; j < len(input); j++ {
				if randoms[i] == input[j] {
					matchCount++
				}
			}
		}

		if matchCount == len(input) {
			break
		}
	}
	fmt.Printf("%d回\n", attempts)
}

// 問題2
func generateRandoms(n int) []int {
	array := make([]int, n)
	for i := 0; i < n; i++ {
		array[i] = rand.Intn(100)
	}
	return array
}
