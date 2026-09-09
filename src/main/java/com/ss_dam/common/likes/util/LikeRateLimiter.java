package com.ss_dam.common.likes.util;

import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

// 값을 담아놓아야 하기 때문에 @Component를 달아놓음
@Component
// Boolean을 쓴 이유는 저장되는 값 자체는 별로 의미 없고 Key가 존재하는지 존재하지 않는지만 판단하려고 메모리를 최소한으로 쓰는 표식 용도로 넣는 것 이라고 합니다
public class LikeRateLimiter {
	private final Cache<String, Boolean> cache = Caffeine.newBuilder()
			.expireAfterWrite(500, TimeUnit.MILLISECONDS)
			.build();
	
	// FeedLike, CommentLike, MarketProductPick에 범용적으로 쓰려고 이런식으로 만들어놓음
	public boolean isAllowed(String targetType, Long memCode, Long targetId) {
		String key = targetType + ":" + memCode + ":" + targetId;
		
		// getIfPresent -> 그냥 있으면 가져오고 없으면 null 뱉으라는 존재 여부 확인용
		if(cache.getIfPresent(key) != null) {
			return false;
		}
		
		cache.put(key, true);
		return true;
	}
}
