const Animal = {
    makeSound() {
        throw new Error("이 메서드는 구현되어야 합니다.");
    }
};

class Dog {
    makeSound() {
        console.log("멍멍!");
    }
}

class Cat {
    makeSound() {
        console.log("야옹!");
    }
}

function animalSound(animal) {
    animal.makeSound();
}

const dog = new Dog();
const cat = new Cat();

animalSound(dog);
animalSound(cat);

const reader = () => {
    const member = ['김성원', '김은정', '최성원', '한승범'];
    const count = Math.random() * 100;
    for (let i = 0; i < count; ++i) {
        let num1 = Math.round(Math.random() * 3);
        let num2 = Math.round(Math.random() * 3);

        let tmp = member[num1];
        member[num1] = member[num2];
        member[num2] = tmp;
    }
    console.log(`우리팀 리더는 ${member[0]}님 입니다!!!`);
}

let count = 0;
while (count < 4) {
    reader();
    ++count;
}

//============================================

/**
 * 추상 클래스 특징
 * 1. 인스턴스 생성 불가
 * 2. 추상 메서드 구현 강제 가능
 * 
 * 인터페이스 특징
 */

//> Appendix II expr
package com.craftinginterpreters.lox;

abstract class Expr {

    abstract<R> R accept(Visitor<R> visitor);

interface Visitor<R> {

        R visitBinaryExpr(Binary expr);

        R visitGroupingExpr(Grouping expr);

        R visitLiteralExpr(Literal expr);

        R visitUnaryExpr(Unary expr);
    }

// Nested Expr classes here...
//> expr-binary
static class Binary extends Expr {

        final Expr left;
        final Token operator;
        final Expr right;
    Binary(Expr left, Token operator, Expr right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    @Override
        <R> R accept(Visitor<R> visitor) {
            return  visitor.visitBinaryExpr(this);
        }
    }

    //< expr-binary
        //> expr-grouping
        static class Grouping extends Expr {

        final Expr expression;

    Grouping(Expr expression) {
        this.expression = expression;
        }

    @Override
    <R> R accept(Visitor<R> visitor) {
            return visitor.visitGroupingExpr(this);
        }
    }

    //< expr-grouping
            //> expr-literal
            static class Literal extends Expr {

        final Object value;

        Literal(Object value) {
            this.value = value;
        }

        @Override
        <R> R accept(Visitor<R> visitor) {
            return visitor.visitLiteralExpr(this);
        }
    }
//< expr-unary

                //< expr-literal
                //> expr-unary
                static class Unary extends Expr {

        final Token operator;
            final Expr right;

            Unary(Token operator, Expr right) {
                this.operator = operator;
            this.right = right;
        }

            @Override
            <R> R accept(Visitor<R> visitor) {
            return visitor.visitUnaryExpr(this);
        }
    }
}
//< Appendix II expr

// =============================================

