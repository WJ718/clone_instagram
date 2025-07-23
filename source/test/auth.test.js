/// <reference types="jest" />
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const User = require('../models/user');
const { where } = require('sequelize');

jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // login
    describe('login()', () => {
        it('성공: 올바른 이메일과 비밀번호 입력 시 사용자 반환', async() => {
            const mockUser = {
                id: 999,
                email: 'test@example.com',
                password: 'test123', // hashed
                nickname: 'admin',
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);

            const user = await authService.login('test@example.com', 'test123');

            expect(User.findOne).toHaveBeenCalledWith({where: {email: 'test@example.com'}});
            expect(bcrypt.compare).toHaveBeenCalledWith('test123', 'test123');
            expect(user).toEqual(mockUser);
        });

        it('실패: 이메일이 존재하지 않으면 에러 발생', async() => {
            User.findOne.mockResolvedValue(null);
            await expect(authService.login('none@example.com', 'test1234')).rejects.toThrow('존재하지 않는 사용자입니다.');
        });

        it('실패: 비밀번호가 틀리면 에러 발생', async() => {
            const mockUser = {email: 'test@example.com', password:'test123'};
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false); // 비밀번호 틀림

            await expect(authService.login('test@example.com', 'wrongpassword')).rejects.toThrow('비밀번호가 일치하지 않습니다.');
        });
    });    

    describe('signup()', () => {
        it('성공: 새로운 사용자 생성 후 반환', async() => {
            const mockUser = {
                id: 999,
                email: 'new@example.com',
                password: 'new123',
                nickname: 'newbie', 
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue(mockUser); // 가상의 회원 생성

            const result = await authService.signup('new@example.com', '1234', 'newbie');

            expect(User.findOne).toHaveBeenCalledWith({where: {email: 'new@example.com'}});
            expect(bcrypt.hash).toHaveBeenCalled();
            expect(User.create).toHaveBeenCalledWith({
                email: 'new@example.com',
                password: 'hashedPassword',
                nickname: 'newbie',
            });
            expect(result).toEqual(mockUser);
        });

        it('실패: 이미 존재하는 이메일로 회원가입 시 에러 발생', async() => {
            const existingUser = {id: 1, email: 'test@example.com'};
            User.findOne.mockResolvedValue(existingUser);

            await expect(authService.signup('test@example.com', '1234', 'dup')).rejects.toThrow('이미 존재하는 사용자입니다.');
        });
    });
});